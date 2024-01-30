// its a machnism how to protect router and pages 

import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({
    children, authentication = true
}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state)=> state.auth.status)

    // useEffect 
    useEffect(()=>{
        
        // let auth value = authStatus === true? true: false

        // true && (false !== true) ==> true final true
        if(authentication && authStatus !== authentication){
            navigate("/login") // agar aap authenticate hi nahi ho to login page pe jao
        }else if(!authentication && authStatus !== authentication){
            // false && true ! == true == > false final false so condition true
            navigate("/")
        }
        setLoader(false)
    },[
        authStatus,
        navigate,
        authentication])

        // return statement 
  return loader? <h1>Loading...</h1> :<>{children}</> 
}

 