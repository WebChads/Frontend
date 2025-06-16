import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { authStore } from './store/AuthStore.tsx'
import { AuthContext } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
    <AuthContext.Provider value={authStore}>\
      <App />
    </AuthContext.Provider>
)


