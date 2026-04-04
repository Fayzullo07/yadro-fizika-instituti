import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';
import Routers from './routes/Routers';
import { initGA } from './utils/analytics';

initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <Routers />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
);
