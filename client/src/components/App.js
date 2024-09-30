import React from 'react';
import NavBar from "./NavBar";
import { Route, Routes, NavLink, createBrowserRouter, RouterProvider, Router, Outlet } from 'react-router-dom'; 
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Footer from '../components/Footer'
import './styles.scss'


const Layout = () => {
    return (
        <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    )
} 

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/about",
                element: <About/>
            },
            {
                path:"/favorites",
                element: <Favorites/>
            },
        ]
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
])

function App() {
  return (
    <div className="App">
        <div className="container">
      <RouterProvider router = {router} />
      </div>
    </div>
  );
}

export default App;