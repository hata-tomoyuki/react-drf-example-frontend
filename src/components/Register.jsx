// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: ''
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
            const response = await axios.post('http://127.0.0.1:8000/user/register/', {
                username: formData.username,
                email: formData.email,
                age: formData.age,
                password: formData.password,
                confirm_password: formData.confirmPassword
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
