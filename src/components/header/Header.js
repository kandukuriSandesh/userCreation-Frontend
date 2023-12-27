import React, { useState } from 'react';
import './Header.css'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSettings } from '../constants/settings';

const Header = ({userInfo,setUserInfo}) => {
   const navigate = useNavigate();
   const logOutFunc = async () => {
    const data = await axios.get('http://localhost:5000/api/users/logout',{
      withCredentials:true
    });
    console.log(data.data)
    if(data.data.message){
      toast('Logged out successfully',toastSettings);
      setUserInfo('')
      localStorage.removeItem('userInfo')
      navigate("/login");
    }
   }
  return (
    <div className='header-container' >
        <div className="title-container">
        <h3 className='title'> User Creation </h3>

        </div>
        {
          userInfo?
          <div className="login-signup-container">
           
            <div className="login-button-header" onClick={logOutFunc}>
              <LogoutIcon/>
              Log out
            </div>
            
        </div>:
        <div className="login-signup-container">
            <Link to='/login' >
            <div className="login-button-header">
              <LoginIcon/> 
              Log In
            </div>
            </Link>
            <Link to={'./signup'} >
            <div className="signup-button-header">
              <AppRegistrationIcon/> 
              Sign Up
            </div>
            </Link>
        </div>
        }
    </div>
  )
}

export default Header