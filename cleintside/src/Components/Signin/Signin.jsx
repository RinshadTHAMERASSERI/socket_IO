import React from "react";
import { useState } from "react";
import route from "../route.js";
import axios from "axios";
import './Signin.scss';
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";


export default function Signin() {
  const [loginDetails, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(
        `${route()}signin`,
        loginDetails,
       { headers: { "Content-Type": "application/json" } }

      );
      if (status === 200) {
        localStorage.setItem("Auth", data.token);
        alert(data.msg);
        navigate('/')

      }
       else {
        alert(data.msg);
      }
    }  catch (error){
console.log("login failed",error);

    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
        type="email"
         name="email"
          id="email"
           onChange={handleChange} />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit">Signin</button>
        <p>Don't have an account?
          
          <Link to={"/signup"}>Signup</Link>
        </p>
      </form>
    </>
  );
}
