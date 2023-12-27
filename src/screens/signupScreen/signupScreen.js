import axios from 'axios';
import React, { useState } from 'react';
import './signupScreen.css'
import {FallingLines} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { toastSettings } from '../../components/constants/settings';
import { Link, useNavigate } from 'react-router-dom';

const SignupScreen = ({update,data}) => {
    const [username,setUsername] = useState(data?data.name:'');
    const [email,setEmail] = useState(data?data.email:'');
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [loader,setLoader] = useState();
    const navigate = useNavigate();
  
  
    const registerUser = async () => {
       if(!passwordVerification()) return
        setLoader(true);
        let data = await axios.post('http://localhost:5000/api/users',{
          email,
          password
        })
        if(data.data.name){
          toast('User Succesfully Registered,Please Log In',toastSettings);
          navigate('/login');
        }
        setLoader(false)
    }

    let passwordVerification = () => {
      
      if(password !== confirmPassword){
        toast('Password and Confirm Password Didnt Match ',toastSettings)
        return false
      }else{
        return true
      }
    }

    const updateUser = async () => {
      if(!passwordVerification()) return
      setLoader(true);
      let updatedData;
      try {
         updatedData = await axios.post('http://localhost:5000/api/users/profile',{
        name:username,
        email:email ,
        password:password
      },{
        withCredentials:true
      })}catch(err){
        toast('something went wrong, please try later');
        console.log(err)
      }
      if(updatedData.data.name){
        toast('Profile Updated Successfully',toastSettings);
      }
      setLoader(false)
    }

    const backFunc = () => {
      navigate('/profile');
      data.setUpdate(false)
    }
  return (
    <div className='outer-div' >
        <div className='form-container' >
          <label htmlFor="username-input" className='username-input-label'>Username*</label>
          <input type="text" className="username-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="email-input" className='email-input-label'>Email*</label>
          <input type="text" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password-input" className='password-input-label' >Password*</label>
          <input type="text" className="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="comfirmpassword-input" className='confirmpassword-input-label' >Confirm Password*</label>
          <input type="text" className="confirmpassword-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className='login-button' onClick={update? updateUser:registerUser} >
         {update? "Update": "Register"}
       </button>
      
       <button className='login-button' onClick={backFunc} >
         Back
       </button>
      
      </div>
      {
        loader? <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        position
        />:null
      }
    </div>
  )
  
}

export default SignupScreen;