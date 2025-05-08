import forge from "node-forge";
import { getPrivateKey } from "./readKey";

export function decryptFields(data: { encrypted_ip: string; encrypted_port: string; encrypted_display_name: string }) {
  const key = getPrivateKey();
  if (!key) return null;

  const priv = forge.pki.privateKeyFromPem(key);
  const decrypt = (enc: string) => forge.util.decodeUtf8(priv.decrypt(forge.util.decode64(enc), "RSAES-PKCS1-V1_5"));

  return {
    ip: decrypt(data.encrypted_ip),
    port: decrypt(data.encrypted_port),
    display_name: decrypt(data.encrypted_display_name),
  };
}
