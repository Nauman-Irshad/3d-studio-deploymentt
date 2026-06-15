import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";

type CaptureFn = () => Promise<Blob | null>;

type Ctx = {
  registerCapture: (fn: CaptureFn) => void;
  captureViewport: CaptureFn;
};

const CaptureContext = createContext<Ctx | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const implRef = useRef<CaptureFn>(async () => null);

  const registerCapture = useCallback((fn: CaptureFn) => {
    implRef.current = fn;
  }, []);

  const captureViewport = useCallback(async () => implRef.current(), []);

  return (
    <CaptureContext.Provider
      value={{ registerCapture, captureViewport }}
    >
      {children}
    </CaptureContext.Provider>
  );
}

export function useCapture() {
  const ctx = useContext(CaptureContext);
  if (!ctx) throw new Error("useCapture outside CaptureProvider");
  return ctx;
}
