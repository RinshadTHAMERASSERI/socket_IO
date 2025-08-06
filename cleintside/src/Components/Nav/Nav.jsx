import React, { useState, useEffect, useRef } from "react";
import "./Nav.scss";
import imge from "../../assets/image/pandu-book.jpeg";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import route from "../route";

function Nav() {
  const value = localStorage.getItem("Auth")
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user,setUser] =useState({})
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate()

useEffect(()=>{
  getDetails()
},[])
const getDetails = async()=>{
  try{
    const {status,data}=await axios.get(`${route()}nav`,{headers:{"Authorization":`Bearer ${value}`}})
    if (status == 200) {
      console.log("fetched data",data);
      setUser(data.user)
    }
    else{
      alert(data.msg)
      navigate('/signin')
    }
  }catch(error){
console.log(error);
navigate('/signin')

  }
}
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          event.target.className !== "mobile-menu-btn") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Home">
      <nav className="navbar">
        <div className="nav-left" ref={mobileMenuRef}>
          <span className="logo">
            <FaInstagram className="icon" />
            <span className="brand-name">Instagram</span>
          </span>
          
          {/* Mobile menu button */}
          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          
          <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <li>
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            </li>
            <li>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </div>
        <div className={`nav-right ${mobileMenuOpen ? "active" : ""}`} ref={dropdownRef}>
          <div className="profile-dropdown">
            <div className="profile-trigger" onClick={toggleDropdown}>
              <img src={user.profile} alt="profile" className="profile-pic" />
              <span>{user.username}</span>
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <div onClick={() => {
                  alert("Go to profile");
                  setShowDropdown(false);
                }}>
                  👤 Profile
                </div>
                <div onClick={() => {
                  handleLogout();
                  setShowDropdown(false);
                }}>
                  🔓 Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;