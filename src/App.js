
import './styles/LandingPage.css'

import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './utils/Spinner';
import { Toaster } from 'react-hot-toast';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import CreateBlogPage from './components/CreateBlogPage';
import CreatedBlogPage from './components/CreatedBlogPage';
import BlogsDetailPage from './components/BlogsDetailPage';

import { Context } from './index';


function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated, setLoading,loading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/api/v1/users/me', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("wtf")
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
      console.log(isAuthenticated)
  }, []);

  if (loading) {
    // Render a loading indicator while checking authentication
    return <Spinner />
  }

  return (
      <div>
        <LandingPage />

        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              {/* Add the following route with the authentication check */}
              <Route
                path="/createNew"
                element= <CreateBlogPage />
              />
              <Route path="/created" element={<CreatedBlogPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blogs/:id" element={<BlogsDetailPage />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
