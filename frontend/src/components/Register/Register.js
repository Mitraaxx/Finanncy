import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Loading';


function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [loading, setLoading] = useState(false);
    const { username, email, password } = formData;
    const navigate = useNavigate();

    const validateUsername = (username) => {
        // Check if username contains any numeric characters
        if (/\d/.test(username)) {
            setUsernameError('Username cannot contain numbers');
            return false;
        }
        setUsernameError('');
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'username') {
            // Real-time validation as the user types
            validateUsername(value);
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validate username before submission
        if (!validateUsername(username)) {
            return; // Prevent submission if username is invalid
        }
        
        setLoading(true);
        
        try {
            // Make sure we're using the correct API endpoint
            const response = await axios.post('https://finanncy.onrender.com/api/v1/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterStyled>
            {loading && <LoadingSpinner overlay={true} />}
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                        disabled={loading}
                        className={usernameError ? 'input-error' : ''}
                    />
                    {usernameError && <div className="field-error">{usernameError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        disabled={loading}
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
                        disabled={loading}
                        minLength="6"
                    />
                    <small>Password must be at least 6 characters</small>
                </div>
                <button type="submit" disabled={usernameError || loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="login-link">
                    Already have an account? <span onClick={() => !loading && navigate('/login')}>Login</span>
                </p>
            </form>
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e6e9f0, #eef1f5);
    font-family: 'Jost', sans-serif;
    position: relative;

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
        transition: border 0.3s, opacity 0.3s;
        outline: none;
    }

    input:focus {
        border-color: #4b61eb;
    }

    input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: #f5f5f5;
    }

    input.input-error {
        border-color: #e74c3c;
        background-color: #fff8f8;
    }

    .field-error {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.2rem;
    }

    small {
        font-size: 0.75rem;
        color: #777;
        margin-top: -0.25rem;
        margin-left: 0.2rem;
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
        transition: background 0.3s, opacity 0.3s;
    }

    button:hover:not(:disabled) {
        background: #3548c4;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .error-message {
        background-color: #ffefef;
        color: #c00;
        padding: 0.75rem;
        border-radius: 6px;
        text-align: center;
        font-size: 0.9rem;
    }

    .login-link {
        text-align: center;
        font-size: 0.9rem;
        color: #444;
    }

    .login-link span {
        color: #4b61eb;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.3s;
    }

    .login-link span:hover {
        opacity: 0.8;
    }
`;

export default Register;
