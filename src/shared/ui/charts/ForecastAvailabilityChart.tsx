import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { ServerForecastPoint } from "@/shared/types/server.type";

const ForecastTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="bg.primary" borderWidth="1px" borderRadius="xl" boxShadow="md" p={3} color="primary" minW="210px">
        <Text fontWeight={600} mb={1}>
          {moment(label).format("DD.MM.YYYY HH:mm:ss")}
        </Text>
        <Text>
          <span style={{ color: "#51b06e" }}>Вероятность доступности: </span>
          <b>{(payload[0].value * 100).toFixed(2)}%</b>
        </Text>
      </Box>
    );
  }
  return null;
};

export function ForecastAvailabilityChart({ data }: { data: ServerForecastPoint[] }) {
  return (
    <ResponsiveContainer height={200}>
      <AreaChart data={data}>
        <XAxis dataKey="timestampObj" tickFormatter={(t) => moment(t).format("HH:mm:ss")} />
        <YAxis domain={[0, 1]} tickFormatter={(val) => (val * 100).toFixed(0) + "%"} />
        <Tooltip content={<ForecastTooltip />} />
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
