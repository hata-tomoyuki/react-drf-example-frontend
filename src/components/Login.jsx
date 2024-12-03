// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/login/', {
                email: formData.email,
                password: formData.password
            });
            const token = response.data.token;
            console.log('Login successful, token:', token);
            // トークンをローカルストレージに保存するなどの処理を行う
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className="simple-login-container">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
