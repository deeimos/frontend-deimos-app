import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ServerMetricModel } from "@/shared/types/server.type";

export const MemoryUsageChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <AreaChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => d.toLocaleTimeString()} />
      <YAxis domain={[0, 100]} unit="%" />
      <Tooltip labelFormatter={(d) => d.toLocaleString()} />
      <Area
        type="monotone"
        dataKey={(metric) => (metric.memory_usage * 100).toFixed(2)}
        name="Memory Usage"
        stroke="#82ca9d"
        fill="#82ca9d"
        isAnimationActive={false}
      />
    </AreaChart>
  </ResponsiveContainer>
);
