import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Index from './pages/Index'
import RegisterPage from './pages/RegisterPage'
import Userpage from './pages/Userpage'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'




const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Index/>} path="/" exact></Route>
                    <Route element={ <RegisterPage/>} path="/register"></Route>
                    <Route element={<Userpage/>} path="/userpage/:id"></Route>
                    <Route element={<Profile/>} path="/profile/:id"></Route>
                    <Route element={<About/>} path="/about"></Route>
                    <Route element={<Contact/>} path="/contact"></Route>



                </Routes>
            
            </BrowserRouter>
        </>
    )
}

export default Router