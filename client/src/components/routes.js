import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Routes } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust the import paths as needed
import Footer from './Footer';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import OceanDetail from './OceansPage';
import AnimalDetail from './AnimalsPage';
import RegisterForm from './RegisterForm';
import Login from './pages/Login';

// Layout component
const Layout = ({ user, setUser }) => {
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <Outlet />
            <Footer />
        </>
    );
};

// Main AppRouter component
const AppRouter = () => {
    const [user, setUser] = useState(); // State defined inside the component

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout user={user} setUser={setUser} />,
            children: [
                {
                    index: true, // This makes the "/" path load the Home component
                    element: <Home />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "favorites",
                    element: <Favorites />,
                },
                {
                    path: "oceans",
                    element: <OceanDetail />,
                },
                {
                    path: "animals",
                    element: <AnimalDetail />,
                }
            ],
        },
        {
            path: "/register",
            element: <RegisterForm onLogin={setUser} />,
        },
        {
            path: "/login",
            element: <Login onLogin={setUser} />,
        },
    ]);

    return <RouterProvider router={router} />;
};

// Export the AppRouter
export default AppRouter;