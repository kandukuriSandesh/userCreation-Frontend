import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SignupScreen from '../signupScreen/signupScreen';
import './profileScreen.css'
import axios from 'axios';

const ProfileScreen = () => {
    const location = useLocation();
    const [update,setUpdate] = useState(false);
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();

    useEffect(() => {
      if(update) return
       const makeCall = async () => {
        let data = await axios.get('http://localhost:5000/api/users/profile',{
        withCredentials:true
       })
       console.log(data)
       if(data.data?.email){
           setEmail(data.data?.email);
           setUsername(data.data?.name)
       }}
       makeCall()
      },[update]);

  return (
    <>
    {!update
      ?
      <div>
        <h1>
            {`Hello ${username}`}
        </h1>
        <h3>
          {`your email is ${email}`}
        </h3>
        <h5>
        {`If you wish to update your details, please` }
        <span className='click-here-button' onClick={() => setUpdate(true)} > Click here</span>
        
        </h5>
    </div>
    :
   <div>
     <SignupScreen update={update} data = {{
      name:username,
      email:email,
      setUpdate:setUpdate
     } } />
   </div>
  }
  </>
  )
}

export default ProfileScreen;