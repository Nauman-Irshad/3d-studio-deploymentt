import ReactDOM from "react-dom/client";
import App from "./App";
import { consumeSnapmeasureFromUrl } from "./fashion/snapmeasureUrlImport";

consumeSnapmeasureFromUrl();

/* StrictMode double-mounts trees in dev and can create two WebGL contexts briefly — bad for R3F. */
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
