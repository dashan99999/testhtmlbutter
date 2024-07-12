import CryptoJS from 'crypto-js';

export const getMD5 = (data: string) => CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);

export const aesDecrypt = (data, iv) => {
  const tmpiv = CryptoJS.enc.Utf8.parse('8a62e6877b' + iv);
  const key = CryptoJS.enc.Utf8.parse('8a2d65b4a683ad0e40e5b156df25e406');
  const decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: tmpiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    formatter: CryptoJS.format.OpenSSL,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
