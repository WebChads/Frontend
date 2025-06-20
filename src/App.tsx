import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import { RequestsProvider } from './modules/tournaments/requestContext';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { api } from './api/ApiInstance';
import { UserRole } from './store/UserRole';



function App() {
  const authStore = useContext(AuthContext)
  const auth = useAuth();
  
  return (
    <RequestsProvider>
    <Router>
    <AppRoutes/>  
    </Router>
    </RequestsProvider>
  )
}

export default App
