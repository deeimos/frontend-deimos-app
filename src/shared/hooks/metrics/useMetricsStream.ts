"use client";
import { useEffect, useRef, useState } from "react";
import { ServerMetricModel } from "../../types/server.type";

export function useMetricsStream(serverId?: string, token?: string | null) {
  const [metric, setMetric] = useState<ServerMetricModel | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = () => {
    if (!serverId || !token) {
      console.warn("[WebSocket] Waiting for serverId or token...");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
    const url = new URL("/metrics", baseUrl);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.searchParams.set("server_id", serverId);
    url.searchParams.set("token", token);

    const ws = new WebSocket(url.toString());
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WebSocket] connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[WebSocket] message", data);
        setMetric(data);
      } catch (err) {
        console.error("[WebSocket] failed to parse", err);
      }
    };

    ws.onerror = (e) => {
      console.log("[WebSocket] error", e);
    };

    ws.onclose = (e) => {
      console.warn("[WebSocket] closed", e.code, e.reason);
      setConnected(false);
      wsRef.current = null;
    };
  };

  useEffect(() => {
    if (!serverId || !token) return;

    connect();

    return () => {
      if (wsRef.current && wsRef.current.readyState < WebSocket.CLOSING) {
        wsRef.current.close();
      }
    };
  }, [serverId, token]);

  const reconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    connect();
  };

  return { metric, connected, reconnect };
}
