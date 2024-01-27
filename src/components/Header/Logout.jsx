import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.appwrite'
import { logout } from '../../store/slices/authSlice'
function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button 
    onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 hover: bg-orange-400 rounded-full'
    >
        Logout
    </button>
  )
}

export default Logout