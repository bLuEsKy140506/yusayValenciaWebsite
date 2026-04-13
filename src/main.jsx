import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Deterrent only (not real security)
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') e.preventDefault();

  // Ctrl/Cmd + Shift + I or J
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }

  // Ctrl/Cmd + U (view source)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
    e.preventDefault();
  }

  // Optional reload block: F5 / Ctrl/Cmd + R
  // if (e.key === 'F5' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r')) {
  //   e.preventDefault();
  // }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
