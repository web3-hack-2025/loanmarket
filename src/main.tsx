import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
