import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import InventoryProvider from './context/InventoryContext.tsx'
import TransactionsProvider from './context/TranscationsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <InventoryProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </InventoryProvider>
    </BrowserRouter>
  </StrictMode>,
)
