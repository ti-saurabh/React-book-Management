import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import img from "../../images/bk.jpg"
import { AuthContext } from '../../Context/AuthContext'
export default function Home() {
  const {currentUser}=useContext(AuthContext)

  return (
    <div className='main-home'>
      <div className='img'> 
      <img src={img} alt="" />
      </div> 
      <div className='textHome'>
            <h1 className='home'>
                Welcome To Book Library
            </h1>
            {currentUser?(
               <Link to="/dashboard"> 
            <button className='home-btn'>
                Dashboard
            </button>
            </Link> 
            ):(
              <Link to="/register"> 
              <button className='home-btn'>
                  Register
              </button>
              </Link> 
            )}
        </div>
    </div>
  )
}
