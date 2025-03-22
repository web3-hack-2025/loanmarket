import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import Result from "./Result.tsx";
import Identity from "./Identity.tsx";
import Apply from "./Apply.tsx";
import Application from "./Application.tsx";
import { IdentityProvider } from './context/IdentityContext'
import React from "react";

// Force dark mode regardless of user's system preference
document.documentElement.classList.add('dark')

// Prevent system preference from overriding dark mode
const forceDarkMode = () => {
  document.documentElement.classList.add('dark')
}

// Add event listener to ensure dark mode persists
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', forceDarkMode)

// Initial call to force dark mode
forceDarkMode()

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <IdentityProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/loan" element={<App />} />

            <Route path="/apply" element={<Apply />} />
            <Route path="/result" element={<Result />} />
            <Route path="/offers" element={<Application />} />

            <Route path="/identity" element={<Identity />} />
          </Routes>
        </BrowserRouter>
      </IdentityProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}