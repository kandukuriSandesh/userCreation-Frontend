import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [userInfo,setUserInfo] = useState('');
 
  return (
    <div className="App">

      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <ToastContainer/>
      <Outlet context={[userInfo,setUserInfo]} />
       
    </div>
  );
}

export default App;
