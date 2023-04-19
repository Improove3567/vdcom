import './App.css';
import useRoutes from './hooks/useRoutes';

function App() {
  const routes = useRoutes();
  return (
    <div>{routes}</div>
  );
}

export default App;
