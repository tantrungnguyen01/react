import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loginpages from './pages/loginpages/Loginpages';
import Errorpages from './pages/404/Errorpages';
import Dashboardlayout from './compoment/Dashboardlayout';
import { Homepages } from './pages/Dashboard/homepages/Homepages';
import { Productpages } from './pages/Dashboard/products/Productpages';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/usecontext';
import { useState } from 'react';
function App() {

const [user,setUser]=useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Loginpages />} />
          <Route path="*" element={< Errorpages />} />
          <Route path="/dashboard" element={<Dashboardlayout />}>
            <Route index element={< Homepages />} />
            <Route path="/dashboard/products" element={<Productpages />} />
          </Route>
        </Routes>
      </div>

    </AuthContext.Provider>

  );
}

export default App;
