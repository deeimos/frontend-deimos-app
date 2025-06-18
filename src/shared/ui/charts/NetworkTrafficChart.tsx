import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ServerMetricModel } from "@/shared/types/server.type";

export const NetworkTrafficChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <LineChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => d.toLocaleTimeString()} />
      <YAxis tickFormatter={(val) => `${(val / 1e6).toFixed(2)} MB`} width={80} />
      <Tooltip formatter={(val) => `${(Number(val) / 1e6).toFixed(2)} MB`} />
      <Legend />
      <Line type="monotone" dataKey="network_rx" stroke="#8884d8" name="Network RX" isAnimationActive={false} />
      <Line type="monotone" dataKey="network_tx" stroke="#82ca9d" name="Network TX" isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);
