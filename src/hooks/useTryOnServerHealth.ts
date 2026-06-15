import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_SERVER_STATE,
  fetchTryOnHealth,
  type TryOnServerState,
} from "../services/tryOnHealth";

const POLL_MS = 12_000;

export function useTryOnServerHealth() {
  const [state, setState] = useState<TryOnServerState>(DEFAULT_SERVER_STATE);

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: prev.online === false && !prev.engine }));
    try {
      const next = await fetchTryOnHealth();
      setState({ loading: false, ...next });
    } catch {
      setState({
        loading: false,
        online: false,
        vtonMode: "real",
        engine: "",
        provider: "",
        hfTokenSet: false,
        etaLabel: "",
      });
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(id);
  }, [refresh]);

  return { serverHealth: state, refreshServerHealth: refresh };
}
