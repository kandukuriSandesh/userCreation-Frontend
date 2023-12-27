import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css';
import {FallingLines} from 'react-loader-spinner';
import{ toast }from 'react-toastify';
import { Navigate, NavigationType, useNavigate, useOutletContext } from 'react-router-dom';
import { toastSettings } from '../../components/constants/settings';
const LoginScreen = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loader,setLoader] = useState();
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useOutletContext()
  
  
    const authenticateUser = async () => {
      setLoader(true)
        let data = await axios.post('http://localhost:5000/api/users/auth',{
          email,
          password
        },{
          withCredentials:true
        })
        if(data.data.message.email){
          toast('Logged In Sucessfully',toastSettings)
          localStorage.setItem('userInfo',data.data.message)
          setUserInfo(data.data.message)
          navigate('/profile',{state:data.data.message})
        }else{
          toast("Email or Password is Incorrect",toastSettings)
        }
      setLoader(false)
    }
  return (
    <div>
        <div className='form-container' >
          <label htmlFor="email-input" className='email-input-label'>Email*</label>
          <input type="text" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password-input" className='password-input-label' >Password*</label>
          <input type="text" className="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='login-button' onClick={authenticateUser} >
         Login
       </button>
      </div>
      {
        loader? <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        />:null
      }
    </div>
  )
}

export default LoginScreen