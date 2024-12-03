// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // トークンが存在するかどうかをチェック
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        // ログアウト処理
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // ログアウト後にログインページにリダイレクト
    };

    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">ホーム</Link></li>
                    {isLoggedIn && <li><Link to="/create">新規レシピ</Link></li>}
                    {!isLoggedIn && <li><Link to="/register">新規登録</Link></li>}
                    {!isLoggedIn && <li><Link to="/login">ログイン</Link></li>}
                    {isLoggedIn && <li><button onClick={handleLogout}>ログアウト</button></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
