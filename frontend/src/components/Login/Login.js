import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { username, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', formData);
            localStorage.setItem('token', response.data.token);
            
            // Store the username from the form in localStorage
            localStorage.setItem('username', username);
            
            console.log('Login successful:', response.data);
            setIsAuthenticated(true);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <LoginStyled>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">
                    Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
                </p>
            </form>
        </LoginStyled>
    );
}

const LoginStyled = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e6e9f0, #eef1f5);
    font-family: 'Jost', sans-serif;

    form {
        background: #fff;
        border-radius: 16px;
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    h2 {
        text-align: center;
        font-size: 1.8rem;
        font-weight: 600;
        color: #222;
        margin-bottom: 0.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        position: relative;
    }

    label {
        font-size: 0.9rem;
        color: #555;
        font-weight: 500;
    }

    input {
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 1rem;
        transition: border 0.3s;
        outline: none;
    }

    input:focus {
        border-color: #4b61eb;
    }

    button {
        padding: 0.75rem;
        border-radius: 999px;
        background: #4b61eb;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background: #3548c4;
    }

    .checkbox-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #555;
    }

    .checkbox-group input {
        margin-right: 0.5rem;
    }

    .checkbox-group a {
        color: #4b61eb;
        text-decoration: none;
        font-weight: 500;
    }

    .register-link {
        text-align: center;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        color: #444;
    }

    .register-link span {
        color: #4b61eb;
        font-weight: 500;
        cursor: pointer;
    }

    .divider {
        text-align: center;
        position: relative;
        margin: 1rem 0;
        font-size: 0.9rem;
        color: #999;
    }

    .divider::before,
    .divider::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 40%;
        background: #ddd;
        top: 50%;
    }

    .divider::before {
        left: 0;
    }

    .divider::after {
        right: 0;
    }

    .social-icons {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .social-icons img {
        width: 36px;
        height: 36px;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .social-icons img:hover {
        transform: scale(1.1);
    }

    .error-message {
        background-color: #ffefef;
        color: #c00;
        padding: 0.75rem;
        border-radius: 6px;
        text-align: center;
        font-size: 0.9rem;
    }
`;



export default Login;