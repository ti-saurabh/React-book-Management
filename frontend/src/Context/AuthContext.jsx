import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const AuthContext=createContext()
export const Auth= ({children}) => {
  const  [currentUser,setCurrentUser]=useState(
    JSON.parse(localStorage.getItem("user"))||null
  )
  const login = async (inputs) =>{
   const res= await axios.post("http://localhost:4000/login",inputs)
   setCurrentUser(res.data)
  }
  const logout = async (inputs) =>{
    await axios.post("http://localhost:4000/logout",inputs)
    setCurrentUser(null)
   }
   useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentUser))
   },[currentUser])

  return (
 <AuthContext.Provider value={{currentUser,login,logout}}>
  {
    children
  }
 </AuthContext.Provider>
  )
}

