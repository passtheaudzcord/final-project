import React from 'react';
import { NavLink } from 'react-router-dom';

function Register() {
    return(
        <div className="register">
            <h1>Register
            </h1>
            <form>
                <input required type="text" placeholder='username' />
                <input required type="password" placeholder='password' />
                <button>Create Account</button>
                <p>This is an error!</p>
                <span>
                    Do you already have an account? Login here. <NavLink to = "/login">Login</NavLink>
                </span>
            </form>
        </div>
    )

}


export default Register;