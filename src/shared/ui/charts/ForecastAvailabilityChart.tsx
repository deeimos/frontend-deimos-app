import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { ServerForecastPoint } from "@/shared/types/server.type";

interface Props {
  data: ServerForecastPoint[];
}

export function ForecastAvailabilityChart({ data }: Props) {
  return (
    <ResponsiveContainer height={200}>
      <AreaChart data={data}>
        <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' })} />
        <YAxis domain={[0, 1]} tickFormatter={(val) => (val * 100).toFixed(0) + "%"} />
        <Tooltip formatter={(val: number) => (val * 100).toFixed(2) + "%"} />
        <Area
          type="monotone"
          dataKey="availability_probability"
          stroke="#51b06e"
          fill="#aee9c5"
          isAnimationActive={false}
          name="Вероятность доступности"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
