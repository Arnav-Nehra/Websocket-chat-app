import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className=" overscroll-none overflow-x-hidden bg-black min-h-screen ">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
