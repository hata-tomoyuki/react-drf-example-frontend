// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            localStorage.setItem('token', token);
            setError('');
            navigate('/'); // ログイン成功後にホームページにリダイレクト
        } catch (error) {
            console.error('Login error:', error.response.data);
            setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        }
    };

    return (
        <div className="login-container">
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">メールアドレス:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">パスワード:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default LoginPage;
