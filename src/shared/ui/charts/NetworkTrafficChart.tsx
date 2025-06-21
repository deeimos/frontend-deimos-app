import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ServerMetricModel } from "@/shared/types/server.type";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

const formatSpeed = (val: number) => {
  if (val > 1024 * 1024) return (val / (1024 * 1024)).toFixed(2) + " МБ/с";
  if (val > 1024) return (val / 1024).toFixed(2) + " КБ/с";
  return Math.round(val) + " Б/с";
};

const NetworkTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="bg.primary" borderWidth="1px" borderRadius="xl" boxShadow="md" p={3} color="primary" minW="210px">
        <Text fontWeight={600} mb={1}>
          {moment(label).format("DD.MM.YYYY HH:mm:ss")}
        </Text>
        <Text>
          <Text as="span" color="purple.500">
            Входящая скорость:{" "}
          </Text>
          <Text as="span" fontWeight={600}>
            {formatSpeed(payload[0].payload.network_rx)}
          </Text>
        </Text>
        <Text>
          <Text as="span" color="green.400">
            Исходящая скорость:{" "}
          </Text>
          <Text as="span" fontWeight={600}>
            {formatSpeed(payload[0].payload.network_tx)}
          </Text>
        </Text>
      </Box>
    );
  }
  return null;
};

export const NetworkTrafficChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <LineChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => d.toLocaleTimeString()} />
      <YAxis tickFormatter={formatSpeed} width={80} />
      <Tooltip content={<NetworkTooltip />} />
      <Legend
        formatter={(value) => {
          switch (value) {
            case "network_rx":
              return "Входящая скорость";
            case "network_tx":
              return "Исходящая скорость";
            default:
              return value;
          }
        }}
      />
      <Line type="monotone" dataKey="network_rx" stroke="#8884d8" name="Входящая скорость" isAnimationActive={false} />
      <Line type="monotone" dataKey="network_tx" stroke="#82ca9d" name="Исходящая скорость" isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);
