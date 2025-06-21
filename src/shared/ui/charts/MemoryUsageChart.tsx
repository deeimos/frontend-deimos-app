import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MemoryTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const percent = (payload[0].payload.memory_usage * 100).toFixed(2);
    return (
      <Box bg="bg.primary" borderWidth="1px" borderRadius="xl" boxShadow="md" p={3} color="primary" minW="210px">
        <Text fontWeight={600} mb={1}>
          {moment(label).format("DD.MM.YYYY HH:mm:ss")}
        </Text>
        <Text>
          <Text as="span" color="green.400">
            Использование ОЗУ:{" "}
          </Text>
          <Text as="span" fontWeight={600}>
            {percent}%
          </Text>
        </Text>
      </Box>
    );
  }
  return null;
};

export const MemoryUsageChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer height={200}>
    <AreaChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => moment(d).format("HH:mm:ss")} />
      <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
      <Tooltip content={<MemoryTooltip />} />
      <Area
        type="monotone"
        dataKey="memory_usage"
        name="Использование ОЗУ"
        stroke="#82ca9d"
        fill="#82ca9d"
        isAnimationActive={false}
      />
    </AreaChart>
  </ResponsiveContainer>
);
