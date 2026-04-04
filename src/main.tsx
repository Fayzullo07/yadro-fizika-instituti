import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './contexts/LanguageContext'
import Routers from './routes/Routers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <Routers />
    </LanguageProvider>
  </StrictMode>,
)
