import React from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
    return(
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder='username' />
                <input required type="password" placeholder='password' />
                <button>Login</button>
                <p>This is an error!</p>
                <span>
                    Don't have an account? Create one here. <NavLink to = "/register">Register</NavLink>
                </span>
            </form>
        </div>
    )

}


export default Login;