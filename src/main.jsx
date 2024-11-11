import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './contexts/ContextApi.jsx'
import AuthContextApi from './contexts/AuthContextApi.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextApi>
  <ContextApi>
  <BrowserRouter>
      <App />
   </BrowserRouter>
  </ContextApi>
  </AuthContextApi>
  </StrictMode>,
)
