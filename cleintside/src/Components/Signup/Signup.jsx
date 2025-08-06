import React, { useState } from "react";
import "./Signup.scss";
import axios from 'axios';
import route from "../route";
import {useNavigate} from 'react-router-dom'

function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
    username: "",
    phone: "",
    profile: "",
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleFile = async (e) => {
    const profile = await convertToBase64(e.target.files[0]);
    setUser((pre) => ({ ...pre, profile: profile }));
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleSubmit =async(e)=>{
e.preventDefault()
try {
    const{data,staus}= await axios.post(`${route()}sign`,user)
    if (staus === 201){
        alert (data,msg)
         navigate('/')
    }
    else{
        alert(data.msg)
    }
} catch (error) {
    console.log("error ocuured",error);
    
}
  }
  return (
    <>
      <form>
        <label htmlFor="photo-upload" className="photo-upload"></label>
        <input
          type="file"
          name=""
          id="pic"
          accept="image/*"
          onChange={handleFile}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" id="phone" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <a href="/signin">
          already you have an account? <span>Login</span>
        </a>
      </form>
    </>
  );
}

export default Signup;
