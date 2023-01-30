import { useRoutes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import './App.css';

function App() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/SignUp',
      element: <SignUp />,
    },
  ]);
  return routes;
}

export default App;
