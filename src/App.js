import Dashboard from "./pages/dashboard/dashboard";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/data';
import Loader from "./components/shared/Loader";
import { AuthApi } from "./apis/auth/authApi";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "./helpers/localStorage";
import "./App.css";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthApi.verifyUser()
    .then((res) => {
        if (res.status == 200) {
          let user = getLocalStorage('user');
          dispatch(setUser(user))
          setLoading(false)
      }
    }).catch((err) => {
      removeLocalStorage('token');
      removeLocalStorage('user');
      navigate('/login')
    })
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <Loader />
    )
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header>
      </div>
    );
  }
}

export default App;
