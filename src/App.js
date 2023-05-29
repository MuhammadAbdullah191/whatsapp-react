import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/data';
import Loader from "./components/shared/Loader";
import { AuthApi } from "./apis/auth/authApi";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AuthApi.verifyUser()
    .then((res)=>{
      if(res.status == 200){
        let user = JSON.parse(localStorage.getItem('user'))
        dispatch(setUser(user))
        setLoading(false)
      }
    }).catch((err)=>{
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate('/login')
    })
  }, []);

  if(loading){
    return(
      <Loader/>
    )
  }else{
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
