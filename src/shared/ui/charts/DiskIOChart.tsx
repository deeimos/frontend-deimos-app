import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ServerMetricModel } from "@/shared/types/server.type";

export const DiskIOChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <LineChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => d.toLocaleTimeString()} />
      <YAxis unit="GB" tickFormatter={(val) => (val / 1e9).toFixed(2)} />
      <Tooltip formatter={(val) => `${(Number(val) / 1e9).toFixed(2)} GB`} />
      <Legend />
      <Line type="monotone" dataKey="disk_read" stroke="#ffc658" name="Disk Read" isAnimationActive={false}/>
      <Line type="monotone" dataKey="disk_write" stroke="#ff8042" name="Disk Write" isAnimationActive={false}/>
    </LineChart>
  </ResponsiveContainer>
);
