import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth.appwrite'
import { login, logout } from './slices/authSlice'
import Header from './components/header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {
  // loading state 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch

  useEffect(()=>{
    authService.gerCurrentUser()
    .then((userData)=> {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  // its called condition rendaring 
  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className=' w-full block'>
        <Header />
        <main>
          TODO: outlet 
          {/* <Outlet/> */}
        </main>
        <Footer />
      </div>
    </div>
  ): (
    // TODO: loading feature add
    null
  )
}

export default App
