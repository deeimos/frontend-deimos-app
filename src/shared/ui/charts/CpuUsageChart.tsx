import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ServerMetricModel } from "@/shared/types/server.type";

export const CpuUsageChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <AreaChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => d.toLocaleTimeString()} />
      <YAxis unit="%" />
      <Tooltip labelFormatter={(d) => d.toLocaleString()} />
      <Area type="monotone" dataKey="cpu_usage" stroke="#8884d8" fill="#8884d8" isAnimationActive={false}/>
    </AreaChart>
  </ResponsiveContainer>
);
