import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PortfolioDataProvider } from './context/PortfolioDataContext.jsx'

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  </StrictMode>,
)
