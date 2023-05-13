import React,{useContext,useEffect} from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import CreateBlogPage from './components/CreateBlogPage';
import CreatedBlogPage from './components/CreatedBlogPage';
import {Context} from "./index";
import {Toaster} from "react-hot-toast"
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);
useEffect(()=>{
  setLoading(true);
  axios.get("http://localhost:4000/api/v1/users/me",{
    withCredentials: true, 
  })
  .then((res)=>{
    setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
  })
  .catch((error)=>{
    console.log(error);
    setUser({});
        setIsAuthenticated(false);
        setLoading(false);
  })
},[])

  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/createNew" element={<CreateBlogPage />} />
    <Route path="/created" element={<CreatedBlogPage />} />
    <Route path="/profile" element={<ProfilePage />} />  
    </Routes>
    <Toaster />
    </div>
    </BrowserRouter>
  );
}

export default App;
