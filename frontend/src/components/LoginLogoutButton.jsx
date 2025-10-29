import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice';
function LoginLogoutButton() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  }
  if(!user){
    return (
        <button onClick={handleLogin} className='ml-auto bg-slate-300 hover:bg-slate-500 hover:text-white p-2 rounded-md flex gap-2 items-center'>
            <h2 className='text-2xl text-white'>Login</h2>
            <img src="google_login.png" alt="google" className='size-6' />
          </button>
    )
  }
  return (
  
          <button onClick={handleLogout} className='ml-auto bg-slate-300 hover:text-white hover:bg-slate-500 hover:scale-110 p-2 rounded-md'>
            Logout
          </button>
  )
}

export default LoginLogoutButton