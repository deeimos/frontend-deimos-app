import { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

const KEY = "hideSensitive";

export function useHideSensitive() {
  const [hideSensitive, setHideSensitive] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return getCookie(KEY) === "true";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookie(KEY, hideSensitive ? "true" : "false", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    }
  }, [hideSensitive]);

  return [hideSensitive, setHideSensitive] as const;
}
