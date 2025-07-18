export interface EncryptedCreateServerModel {
  encrypted_ip: string;
  encrypted_port: string;
  encrypted_display_name: string;
  is_monitoring_enabled: boolean;
}
export interface EncryptedEditServerModel  extends EncryptedCreateServerModel {
  id: string
}


export interface EncryptedServerModel extends EncryptedCreateServerModel {
  id: string;
  is_server_enabled: boolean;
  created_at: string;
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

export type ServerFormValues = {
  display_name: string;
  ip: string;
  port: string;
  is_monitoring_enabled: boolean;
};

export interface ServerMetricModel {
  total_memory: number;
  cpu_core_count: number;
  cpu_usage: number; // в процентах
  memory_usage: number;  // в долях от 0 до 1
  disk_usage: number;  
  load_avg_1: number;
  load_avg_5: number;
  load_avg_15: number;
  network_rx: number; 
  network_tx: number;      
  disk_read: number;      
  disk_write: number;      
  process_count: number;
  io_wait: number;
  uptime_seconds: number;
  temperature: number;
  status: string;  
  timestamp: string; 
  timestampObj: Date | null | undefined;
}

export interface ServerForecastPoint {
  timestamp: string;
  cpu_load: number;  // от 0 до 1 (загрузка CPU, доля)
  memory_load: number; // от 0 до 1 (загрузка памяти, доля)
  disk_usage: number; // в GB
  load_avg_1: number; // 1-минутный load avg
  load_avg_5: number; // 5-минутный load avg
  network_rx: number;
  network_tx: number;
  availability_probability: number; // от 0 до 1
  status: string;
  timestampObj: Date | null | undefined;
}

export interface ServerForecast {
  server_id: string;
  forecasts: ServerForecastPoint[];
}