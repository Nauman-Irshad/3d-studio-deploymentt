import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FashionApp } from "./fashion/FashionApp";
import { TailorsPage } from "./fashion/TailorsPage";
import "./index.css";

const viteBaseUrl = import.meta.env.BASE_URL || "/";
const routerBasename =
  viteBaseUrl === "/" ? "/" : viteBaseUrl.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<FashionApp />} />
        <Route path="/tailors" element={<TailorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
