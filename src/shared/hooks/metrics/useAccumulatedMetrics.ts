import { useEffect, useRef, useState } from "react";
import { ServerMetricModel } from "@/shared/types/server.type";
import { useMetricsStream } from "@/shared/hooks/metrics/useMetricsStream";
import { parseUTC } from "@/shared/utils/parseUTC";


export function useAccumulatedMetrics(serverId: string, token: string | null, limit = 20) {
  const { metric, connected } = useMetricsStream(serverId, token);
  const [metrics, setMetrics] = useState<ServerMetricModel[]>([]);
  const metricsRef = useRef(metrics);

  useEffect(() => {
    if (metric) {
        const metricWithDate = { ...metric, timestampObj: parseUTC(metric.timestamp) };
        metricsRef.current = [...metricsRef.current, metricWithDate].slice(-limit);
        setMetrics(metricsRef.current);
    }
  }, [metric, limit]);

  return { metrics, connected };
}
