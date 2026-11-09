const fs = require('fs');
const path = require('path');

const darkPath = path.resolve(__dirname, '../public/logo-playtech-dark.png');
const lightPath = path.resolve(__dirname, '../public/logo-playtech-light.png');

const darkBase64 = fs.readFileSync(darkPath).toString('base64');
const lightBase64 = fs.readFileSync(lightPath).toString('base64');

const content = `// Auto-generated Base64 logos to ensure instantaneous zero-latency render during Splash Screen
export const LOGO_PLAYTECH_DARK = "data:image/png;base64,${darkBase64}";
export const LOGO_PLAYTECH_LIGHT = "data:image/png;base64,${lightBase64}";
`;

fs.writeFileSync(path.resolve(__dirname, '../src/lib/logosBase64.ts'), content, 'utf-8');
console.log('SUCCESS: logosBase64.ts generated!');

