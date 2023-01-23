import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img from "../../images/bkkk.jpg"
import { AuthContext } from '../../Context/AuthContext';
const Create = () => {
  const {currentUser}=useContext(AuthContext)


  const[book,setBook]=useState({
    title:"",
    excerpt:"",
    userId:currentUser.id,
    ISBN:"",
    category:"",
    subcategory:"",
    releasedAt:""
  })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (E) => {
    E.preventDefault();
    try {
      await axios.post("http://localhost:4000/books", book);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data); 
      console.log(error.data)
    }
  };

  const handleChange = async (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="main-home">
    <div className="img" >

    <img src={img} alt="" />
    </div>  
    <div className="form">
      <form >
        <h1>Add books details</h1>
        <input
          placeholder="Enter your title"
          name="title"
          onChange={handleChange}
        />
     
        <input
          placeholder="Enter your excerpt"
          name="excerpt"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your phone number"
          name="phone"
          onChange={handleChange}
        />
        <input
           type="number"
          placeholder="Enter your ISBN"
          name="ISBN"
          onChange={handleChange}
        />
        <input
          placeholder="Enter your book category"
          name="category"
          onChange={handleChange}
        />
        <input
          placeholder="Enter your book subcategory"
          name="subcategory"
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Enter your release date"
          name="releasedAt"
          onChange={handleChange}
        />
        <Link to="/dashboard">
        <button onClick={handleSubmit} >
            sumbit
        </button>
        </Link>
        {error && <p>{error}</p>}
        <span >
            Back to dashboard=
            <Link to="/dashboard" style={{"textDecoration":"none"}}>
            Dashboard
            </Link>
          </span>
       </form>

        </div>
        </div>
  )
}

export default Create