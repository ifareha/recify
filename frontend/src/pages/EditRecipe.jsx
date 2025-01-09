import { Button } from '@/components/ui/button';
import { editRecipe } from '@/store/reducer/recipeSlice';
import { GET_ALL_RECIPE_API_ } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EditRecipe = () => {
    const {id: recipeId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {allUsersRecipes} = useSelector((store) => store.recipe)
    const { user } = useSelector((store) => store.auth);
    const { loading } = useSelector((store) => store.auth);
    const [input, setInput] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        recipeImage: null
     
    });
  useEffect(() =>{
    if(allUsersRecipes && allUsersRecipes.length > 0) {
        const recipe = allUsersRecipes.find((recipe) => recipe._id === recipeId)
        if(recipe) {
            setInput({
                title: recipe.title,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                recipeImage: recipe.recipeImage
            });       
            } else {
            toast.error("Recipe not found")
            navigate("/profile")
        }
    }
  },[allUsersRecipes, recipeId, navigate])
    
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value })
    }
    const imageHandler = (e) => {
        const file = e.target.files[0];
        setInput({...input, recipeImage: file })
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("ingredients", input.ingredients);
        formData.append("instructions", input.instructions);
        formData.append("recipeImage", input.recipeImage);
        console.log([...formData]);
        try {
            const res = await axios.put(`${GET_ALL_RECIPE_API_}/edit/${recipeId}`, formData, {
              headers: {
                'Content-Type':'multipart/form-data',
                'Authorization': `Bearer ${user.token}`,
              },
              withCredentials: true,
            });
            if (res.data.success) {
             dispatch(editRecipe(res.data.recipe))
              navigate(`/profile`);
              toast.success("Recipe updated successfully");
            }
          } catch (error) {
            console.error(error);
          }
    }
    
  return ( 
    <div className="h-screen bg-white flex justify-center items-center py-8">
    <div className="w-full max-w-2xl p-8">
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        update Recipe
      </h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter recipe title"
            value={input.title}
            onChange={changeHandler}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            placeholder="e.g., eggs, flour, sugar"
            value={input.ingredients}
            onChange={changeHandler}
            className="w-full px-4 resize-none py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">
            Instructions 
          </label>
          <textarea
            name="instructions"
            placeholder="e.g., mix ingredients, bake at 350°F"
            value={input.instructions}
            onChange={changeHandler}
            className="w-full resize-none px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            required
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">
            Upload Recipe Image
          </label>
          <input
            type="file"
            name="recipeImage"
            accept="image/*"
            onChange={imageHandler}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mt-6">
        {
            loading ? <Button > <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait.. </Button>:<Button>Add Recipe
        </Button>
          }
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditRecipe