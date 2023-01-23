// import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import img from "../../images/bk.jpg"
import { AuthContext } from '../../Context/AuthContext';

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const { login } = useContext(AuthContext)

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/dashboard")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChange = async (e) => {
    setInputs((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ))
  }
  return (
    <div>
      <div>
        <form>
          <h1>
            Login
          </h1>

          <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} />
          <input type="password" placeholder='Enter your password' name="password" onChange={handleChange} />
          <div>
            <Link to="/dashboard">
              <button onClick={handleSubmit}>
                login
              </button>
            </Link>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
