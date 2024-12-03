import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート

const PostRecipe = () => {
    const [recipeData, setRecipeData] = useState({
        title: '',
        instruction: ''
    });

    const navigate = useNavigate(); // useNavigateフックを使用

    const handleChange = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://127.0.0.1:8000/recipe/recipe/', recipeData, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log('Recipe posted:', response.data);
            navigate('/'); // 成功したらトップページにリダイレクト
        } catch (error) {
            console.error('Error posting recipe:', error.response.data);
        }
    };

    return (
        <form className="post-recipe-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} />
            <textarea name="instruction" placeholder="Instruction" onChange={handleChange}></textarea>
            <button type="submit">Post Recipe</button>
        </form>
    );
};

export default PostRecipe;
