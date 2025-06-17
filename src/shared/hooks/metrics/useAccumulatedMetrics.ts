import { useEffect, useRef, useState } from "react";
import { ServerMetricModel } from "@/shared/types/server.type";
import { useMetricsStream } from "@/shared/hooks/metrics/useMetricsStream";

export function useAccumulatedMetrics(serverId: string, token: string | null, limit = 20) {
  const { metric, connected } = useMetricsStream(serverId, token);
  const [metrics, setMetrics] = useState<ServerMetricModel[]>([]);
  const metricsRef = useRef(metrics);

  useEffect(() => {
    if (metric) {
      metricsRef.current = [...metricsRef.current, metric].slice(-limit);
      setMetrics(metricsRef.current);
    }
  }, [metric, limit]);

  return { metrics, connected };
}
