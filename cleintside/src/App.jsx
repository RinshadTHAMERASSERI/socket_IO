import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Nav from './Components/Nav/Nav.jsx'
import Home from './Components/Home/Home.jsx';


function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
