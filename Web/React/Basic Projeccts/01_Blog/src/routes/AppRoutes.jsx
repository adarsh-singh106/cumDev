import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import PostDetails from '../components/PostDetails';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<PostDetails/>}/>
        <Route path='/blog' element={<Home/>}/>
        <Route path='/about' element={<div>About Page</div>}/>
        <Route path='/contact' element={<div>Contact Page</div>}/>
    </Routes>
  )
}

export default AppRoutes;