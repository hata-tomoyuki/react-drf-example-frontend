import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const RecipeDetail = () => {
    const { id } = useParams(); // URLからIDを取得
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/recipe/recipe/${id}/`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching the recipe details", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-detail">
            <h1>{recipe.title}</h1>
            <p>{recipe.instruction}</p>
        </div>
    );
}

export default RecipeDetail;
