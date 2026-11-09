/**
 * Asaas Payment Gateway Integration Module
 * Documentação da API: https://docs.asaas.com/reference
 * Suporta Sandbox e Produção
 */

export interface AsaasCustomerData {
  name: string;
  cpfCnpj: string;
  email: string;
  mobilePhone?: string;
  phone?: string;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
}

export interface AsaasCreditCardData {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

export interface AsaasCreditCardHolderInfo {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode?: string;
  addressNumber?: string;
  phone?: string;
  mobilePhone?: string;
}

export interface AsaasChargeRequest {
  customer: string; // Customer ID do Asaas (ex: cus_000005891234)
  billingType: "PIX" | "CREDIT_CARD" | "BOLETO";
  value: number;
  dueDate: string; // YYYY-MM-DD
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  installmentValue?: number;
  creditCard?: AsaasCreditCardData;
  creditCardHolderInfo?: AsaasCreditCardHolderInfo;
}

export interface AsaasPixQrCodeResponse {
  encodedImage: string; // Base64 da imagem QR Code
  payload: string; // Chave copia e cola
  expirationDate: string;
}

export class AsaasClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.ASAAS_API_KEY || "";
    const isProd = process.env.ASAAS_ENVIRONMENT === "production";
    this.baseUrl = isProd 
      ? "https://api.asaas.com/v3" 
      : "https://sandbox.asaas.com/v3";
  }

  private get headers() {
    return {
      "Content-Type": "application/json",
      "access_token": this.apiKey,
      "User-Agent": "PlayTech-Store-Web/1.0"
    };
  }

  /**
   * Procura ou cria um cliente no Asaas com Nome, CPF/CNPJ, Email e Telefone
   */
  async findOrCreateCustomer(data: AsaasCustomerData): Promise<{ id: string; name: string; email: string }> {
    // Sanitizar CPF
    const cleanCpf = data.cpfCnpj.replace(/\D/g, "");

    // Se não tiver chave real configurada no momento, retorna mock para garantir fluidez do dev
    if (!this.apiKey || this.apiKey === "test_token_asaas_playtech") {
      return {
        id: `cus_sim_${Date.now()}`,
        name: data.name,
        email: data.email
      };
    }

    try {
      // 1. Tentar buscar por CPF
      const searchRes = await fetch(`${this.baseUrl}/customers?cpfCnpj=${cleanCpf}`, {
        method: "GET",
        headers: this.headers,
      });

      if (searchRes.ok) {
        const result = await searchRes.json();
        if (result.data && result.data.length > 0) {
          return {
            id: result.data[0].id,
            name: result.data[0].name,
            email: result.data[0].email
          };
        }
      }

      // 2. Se não encontrou, criar novo cliente
      const createRes = await fetch(`${this.baseUrl}/customers`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          cpfCnpj: cleanCpf,
          email: data.email,
          mobilePhone: data.mobilePhone?.replace(/\D/g, "") || data.phone?.replace(/\D/g, ""),
          postalCode: data.postalCode?.replace(/\D/g, ""),
          address: data.address,
          addressNumber: data.addressNumber,
          complement: data.complement,
          province: data.province,
          notificationDisabled: false,
        })
      });

      if (!createRes.ok) {
        const errorData = await createRes.json();
        throw new Error(errorData.errors?.[0]?.description || "Erro ao criar cliente no Asaas");
      }

      const created = await createRes.json();
      return {
        id: created.id,
        name: created.name,
        email: created.email
      };
    } catch (err: any) {
      console.error("[Asaas] Erro em findOrCreateCustomer:", err);
      throw err;
    }
  }

  /**
   * Cria uma cobrança PIX e retorna o QR Code e chave Copia e Cola
   */
  async createPixCharge(params: {
    customerId: string;
    value: number;
    description: string;
    orderId?: string;
  }): Promise<{ paymentId: string; pixPayload: string; pixQrCodeBase64: string; value: number }> {
    const today = new Date().toISOString().split("T")[0];

    // Se em modo simulação sem API Key ativa
    if (!this.apiKey || this.apiKey === "test_token_asaas_playtech") {
      const mockPayload = `00020126580014br.gov.bcb.pix0136asaas-playtech-store-hub5204000053039865407${params.value.toFixed(2)}5802BR5915Playtech Brasil6009Sao Paulo62070503***6304C8A1`;
      return {
        paymentId: `pay_pix_mock_${Date.now()}`,
        pixPayload: mockPayload,
        pixQrCodeBase64: "",
        value: params.value
      };
    }

    try {
      const chargeRes = await fetch(`${this.baseUrl}/payments`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          customer: params.customerId,
          billingType: "PIX",
          value: params.value,
          dueDate: today,
          description: params.description,
          externalReference: params.orderId || `ORDER_${Date.now()}`
        })
      });

      if (!chargeRes.ok) {
        const errorData = await chargeRes.json();
        throw new Error(errorData.errors?.[0]?.description || "Erro ao gerar cobrança PIX no Asaas");
      }

      const payment = await chargeRes.json();

      // Obter QR Code e Payload Pix
      const qrRes = await fetch(`${this.baseUrl}/payments/${payment.id}/pixQrCode`, {
        method: "GET",
        headers: this.headers
      });

      let pixPayload = "";
      let pixQrCodeBase64 = "";

      if (qrRes.ok) {
        const qrData: AsaasPixQrCodeResponse = await qrRes.json();
        pixPayload = qrData.payload;
        pixQrCodeBase64 = qrData.encodedImage;
      }

      return {
        paymentId: payment.id,
        pixPayload,
        pixQrCodeBase64,
        value: payment.value
      };
    } catch (err: any) {
      console.error("[Asaas] Erro em createPixCharge:", err);
      throw err;
    }
  }

  /**
   * Cria uma cobrança com Cartão de Crédito via Asaas
   */
  async createCreditCardCharge(params: {
    customerId: string;
    value: number;
    description: string;
    installments: number;
    creditCard: AsaasCreditCardData;
    creditCardHolderInfo: AsaasCreditCardHolderInfo;
    orderId?: string;
  }): Promise<{ paymentId: string; status: string; installmentCount: number }> {
    const today = new Date().toISOString().split("T")[0];

    if (!this.apiKey || this.apiKey === "test_token_asaas_playtech") {
      return {
        paymentId: `pay_cc_mock_${Date.now()}`,
        status: "CONFIRMED",
        installmentCount: params.installments
      };
    }

    try {
      const payload: any = {
        customer: params.customerId,
        billingType: "CREDIT_CARD",
        value: params.value,
        dueDate: today,
        description: params.description,
        externalReference: params.orderId || `ORDER_${Date.now()}`,
        creditCard: params.creditCard,
        creditCardHolderInfo: params.creditCardHolderInfo
      };

      if (params.installments > 1) {
        payload.installmentCount = params.installments;
        payload.installmentValue = Number((params.value / params.installments).toFixed(2));
      }

      const chargeRes = await fetch(`${this.baseUrl}/payments`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!chargeRes.ok) {
        const errorData = await chargeRes.json();
        throw new Error(errorData.errors?.[0]?.description || "Erro ao processar cartão de crédito no Asaas");
      }

      const payment = await chargeRes.json();
      return {
        paymentId: payment.id,
        status: payment.status,
        installmentCount: params.installments
      };
    } catch (err: any) {
      console.error("[Asaas] Erro em createCreditCardCharge:", err);
      throw err;
    }
  }
}

export const asaas = new AsaasClient();

