import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/login';
import OtpScreen from '../pages/login/otpScreen';
import NotFound from '../pages/notFound/NotFound';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verifyOtp" element={<OtpScreen />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

