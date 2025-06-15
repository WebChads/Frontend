import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import { RequestsProvider } from './modules/tournaments/requestContext';


function App() {

  return (
    <RequestsProvider>
    <Router>
    <AppRoutes/>  
    </Router>
    </RequestsProvider>
  )
}

export default App
