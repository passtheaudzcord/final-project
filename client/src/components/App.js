import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import RegisterForm from './RegisterForm';
import Login from './pages/Login';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Footer from '../components/Footer';
import OceanDetail from "./OceansPage";
import AnimalDetail from "./AnimalsPage";
import './styles.scss';

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

function App() {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        // Auto-login
        fetch("http://localhost:5555/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);
    
    // Router definition moved outside to avoid potential re-renders
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout user={user} setUser={setUser} />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/favorites",
                    element: <Favorites />,
                },
                {
                    path: "/oceans",
                    element: <OceanDetail />,
                },
                {
                    path: "/animals",
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
    
    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return (
        <div className="App">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;