import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import { RequestsProvider } from './modules/tournaments/requestContext';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';



function App() {
  const authStore = useContext(AuthContext)
  authStore.login("f");
  const auth = useAuth();
  console.log(auth.user?.role)
  return (
    <RequestsProvider>
    <Router>
    <AppRoutes/>  
    </Router>
    </RequestsProvider>
  )
}

export default App
