import { ServerMetricModel } from "@/shared/types/server.type";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LoadAvgTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="bg.primary" borderWidth="1px" borderRadius="xl" boxShadow="md" p={3} color="primary" minW="210px">
        <Text fontWeight={600} mb={1}>
          {moment(label).format("DD.MM.YYYY HH:mm:ss")}
        </Text>
        {payload.map((pl: any) => (
          <Text key={pl.dataKey} color={pl.stroke} mb={1}>
            {pl.dataKey === "load_avg_1" && "Средняя нагрузка за 1 мин:"}
            {pl.dataKey === "load_avg_5" && "Средняя нагрузка за 5 мин:"}
            {pl.dataKey === "load_avg_15" && "Средняя нагрузка за 15 мин:"}
            <b> {pl.value}</b>
          </Text>
        ))}
      </Box>
    );
  }
  return null;
};

export const LoadAverageChart = ({ data }: { data: ServerMetricModel[] }) => (
  <ResponsiveContainer height={200}>
    <LineChart data={data}>
      <XAxis dataKey="timestampObj" tickFormatter={(d) => moment(d).format("HH:mm:ss")} />
      <YAxis />
      <Tooltip content={<LoadAvgTooltip />} />
      <Legend
        formatter={(value) => {
          switch (value) {
            case "load_avg_1":
              return "Средняя нагрузка за 1 мин";
            case "load_avg_5":
              return "Средняя нагрузка за 5 мин";
            case "load_avg_15":
              return "Средняя нагрузка за 15 мин";
            default:
              return value;
          }
        }}
      />
      <Line type="monotone" dataKey="load_avg_1" stroke="#ff7300" name="За 1 мин" isAnimationActive={false} />
      <Line type="monotone" dataKey="load_avg_5" stroke="#387908" name="За 5 мин" isAnimationActive={false} />
      <Line type="monotone" dataKey="load_avg_15" stroke="#8884d8" name="За 15 мин" isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);
