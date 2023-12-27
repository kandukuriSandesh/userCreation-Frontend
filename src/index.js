import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Router,createRoutesFromElements, Route, Routes} from 'react-router-dom';
import LoginScreen from './screens/loginScreen/loginScreen.js';
import SignupScreen from './screens/signupScreen/signupScreen.js';
import ProfileScreen from './screens/profileScreen/profileScreen.js';
import ProtectedRoute from './utils/protectedRoute.js';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children:[{
        path:'login',
        element:<LoginScreen/>
      },
      {
        path:'/signup',
        element:<SignupScreen/>
      },
      {
        path:'/profile',
        element:<ProtectedRoute>
          <ProfileScreen/>
          </ProtectedRoute>
      }]
    },
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router= {router}/>

    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
