import { Box, Text } from "@chakra-ui/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import { ServerMetricModel } from "@/shared/types/server.type";

const CpuTooltip = ({ active, payload, label }: any) => {
  // Добавить типы
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const labelText = moment(label).format("DD.MM.YYYY HH:mm:ss");
    return (
      <Box
        bg="bg.primary"
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="md"
        p={3}
        color="primary"
        minW="210px"
      >
        <Text fontWeight={600} mb={1}>
          {labelText}
        </Text>
        <Text>
          <Text as="span" color="purple.500">
            Нагрузка ЦП:
          </Text>{" "}
          <Text as="span" fontWeight={600}>
            {value?.toFixed(2)}%
          </Text>
        </Text>
      </Box>
    );
  }
  return null;
};

export const CpuUsageChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <AreaChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => moment(d).format("HH:mm:ss")} />
      <YAxis unit="%" />
      <Tooltip content={<CpuTooltip />} />
      <Area type="monotone" dataKey="cpu_usage" stroke="#8884d8" fill="#8884d8" isAnimationActive={false} />
    </AreaChart>
  </ResponsiveContainer>
);
