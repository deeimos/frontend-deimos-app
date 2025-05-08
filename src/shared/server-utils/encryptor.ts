import forge from "node-forge";
import { getPublicKey, getPrivateKey } from "./readKey";

export function encryptFields(data: { ip: string; port: string; display_name: string }) {
  const key = getPublicKey();
  if (!key) return null;

  const pub = forge.pki.publicKeyFromPem(key);
  const encrypt = (text: string) => forge.util.encode64(pub.encrypt(forge.util.encodeUtf8(text), "RSAES-PKCS1-V1_5"));

  return {
    encrypted_ip: encrypt(data.ip),
    encrypted_port: encrypt(data.port),
    encrypted_display_name: encrypt(data.display_name),
  };
}
