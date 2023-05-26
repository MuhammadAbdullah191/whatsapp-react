import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/data'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(Math.floor(Math.random() * (3 - 1 + 1)) + 1));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
