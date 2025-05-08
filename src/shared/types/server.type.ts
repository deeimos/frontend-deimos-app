export interface EncryptedCreateServerModel {
  encrypted_ip: string;
  encrypted_port: string;
  encrypted_display_name: string;
  is_monitoring_enabled: boolean;
  is_server_enabled: boolean;
  created_at: string;
}

export interface EncryptedServerModel extends EncryptedCreateServerModel {
  id: string;
}

export interface ServerModel {
  id: string;
  ip: string;
  port: string;
  display_name: string;
  is_monitoring_enabled: boolean;
  is_server_enabled: boolean;
  created_at: string;
}