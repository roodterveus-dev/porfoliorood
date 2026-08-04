import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PortfolioDataProvider } from './context/PortfolioDataContext.jsx'

const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {isAdmin ? (
          <AdminApp />
        ) : (
          <PortfolioDataProvider>
            <App />
          </PortfolioDataProvider>
        )}
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
