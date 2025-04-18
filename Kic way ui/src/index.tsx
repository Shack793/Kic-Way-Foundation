import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App";

const rootElement = document.getElementById("app");
if (!rootElement) {
  console.error("Root element with id 'app' not found!");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<div>Loading application...</div>}>
        <App />
      </Suspense>
    </StrictMode>
  );
}

