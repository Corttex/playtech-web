import { NextRequest, NextResponse } from "next/server";
import { asaas } from "@/lib/payments/asaas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      cpf,
      paymentMethod, // "PIX" | "CREDIT_CARD"
      amount,
      installments = 1,
      creditCard,
      items,
      address,
    } = body;

    // Validação inicial dos 4 campos obrigatórios
    if (!name || !email || !phone || !cpf) {
      return NextResponse.json(
        { error: "Nome, e-mail, telefone e CPF são obrigatórios para emissão do pagamento e NFe." },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valor total do pedido inválido." },
        { status: 400 }
      );
    }

    // 1. Criar ou encontrar cliente no Asaas
    const customer = await asaas.findOrCreateCustomer({
      name,
      email,
      mobilePhone: phone,
      cpfCnpj: cpf,
      address: address?.street,
      addressNumber: address?.number,
      postalCode: address?.cep,
      province: address?.state,
    });

    const description = `Pedido PlayTech Store - ${items?.length || 1} itens`;

    // 2. Processar de acordo com o método
    if (paymentMethod === "PIX") {
      const pixResponse = await asaas.createPixCharge({
        customerId: customer.id,
        value: amount,
        description,
      });

      return NextResponse.json({
        success: true,
        paymentMethod: "PIX",
        gateway: "ASAAS",
        paymentId: pixResponse.paymentId,
        pixPayload: pixResponse.pixPayload,
        pixQrCodeBase64: pixResponse.pixQrCodeBase64,
        amount: pixResponse.value,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
      });
    }

    if (paymentMethod === "CREDIT_CARD") {
      if (!creditCard || !creditCard.number || !creditCard.holderName) {
        return NextResponse.json(
          { error: "Dados do cartão de crédito incompletos." },
          { status: 400 }
        );
      }

      const cardResponse = await asaas.createCreditCardCharge({
        customerId: customer.id,
        value: amount,
        description,
        installments: Number(installments) || 1,
        creditCard: {
          holderName: creditCard.holderName,
          number: creditCard.number.replace(/\s/g, ""),
          expiryMonth: creditCard.expiryMonth,
          expiryYear: creditCard.expiryYear,
          ccv: creditCard.ccv,
        },
        creditCardHolderInfo: {
          name,
          email,
          cpfCnpj: cpf,
          mobilePhone: phone,
          postalCode: address?.cep,
          addressNumber: address?.number,
        },
      });

      return NextResponse.json({
        success: true,
        paymentMethod: "CREDIT_CARD",
        gateway: "ASAAS",
        paymentId: cardResponse.paymentId,
        status: cardResponse.status,
        installments: cardResponse.installmentCount,
        amount,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
      });
    }

    return NextResponse.json(
      { error: "Método de pagamento não suportado." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[API Asaas Checkout Error]:", error);
    return NextResponse.json(
      { error: error.message || "Falha ao processar pagamento com o Asaas." },
      { status: 500 }
    );
  }
}

