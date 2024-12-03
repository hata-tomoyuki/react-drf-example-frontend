// src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            setError('パスワードが一致しません。');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/register/', {
                username: formData.username,
                email: formData.email,
                age: formData.age,
                password: formData.password,
                confirm_password: formData.confirmPassword
            });
            console.log('Registration successful:', response.data);
            setError('');
            navigate('/login'); // 登録成功後にログインページにリダイレクト
        } catch (error) {
            console.error('Registration error:', error.response.data);
            setError('登録に失敗しました。入力内容を確認してください。');
        }
    };

    return (
        <div className="register-page-container">
            <h2>新規登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">ユーザー名:</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">メールアドレス:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="age">年齢:</label>
                    <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">パスワード:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">パスワード確認:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">登録</button>
            </form>
        </div>
    );
};

export default RegisterPage;
