import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from "./NavBar";
import RegisterForm from './RegisterForm';
import Login from './pages/Login';
import About from './pages/About';
import EditAnimal from './EditAnimal'
import Favorites from './Favorites';
import Home from './Home';
import Footer from '../components/Footer';
import OceansPage from "./OceansPage";
import AnimalsPage from "./AnimalsPage";
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
    const [user, setUser] = useState(null); // Initialize user as null
    const [animals, setAnimals] = useState([]);
    const [showForm, setShowForm] = useState(false);

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
                    element: <OceansPage />,
                },
                {
                    path: "/animals",
                    element: <AnimalsPage />,
                },
                {
                    path: "/animals/edit/:id", // Add the edit route here
                    element: <EditAnimal />, // Ensure this is your edit component
                },
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

    return (
        <div className="App">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;