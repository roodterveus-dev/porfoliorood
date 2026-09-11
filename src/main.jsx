import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PortfolioDataProvider } from './context/PortfolioDataContext.jsx'

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {isAdmin ? (
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        ) : (
          <PortfolioDataProvider>
            <App />
          </PortfolioDataProvider>
        )}
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
