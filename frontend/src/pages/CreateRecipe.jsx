import { Button } from '@/components/ui/button'
import { GET_ALL_RECIPE_API_ } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateRecipe = () => {
    const [formData, setFormData] = useState({
      title: '',
      ingredients: '',
      instructions: '',
      time: '',
    })
    const [loading, setLoading] = useState(false)
const navigate  = useNavigate()
    const changeHandler = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value });
    }
    const imageHandler = (e) => {
      const file = e.target.files[0];
      setFormData({...formData, recipeImage: file });
      console.log(file);
      
    }
    const submitHandler = async(e) => {
      e.preventDefault();
      
      try {
        setLoading(true);
        const data = new FormData();
        data.append("title", formData.title);
        data.append("ingredients", formData.ingredients);
        data.append("instructions", formData.instructions);
        data.append("time", formData.time);
        if(formData.recipeImage){
          data.append("recipeImage", formData.recipeImage);
        }

        
        const res = await axios.post(`${GET_ALL_RECIPE_API_}/create`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })
        if(res.data.success){
          toast.success(res.data.message)
          navigate("/")
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
      finally{
        setLoading(false);
      }
    }

  return (
    <div className="h-screen bg-white flex justify-center items-center py-8">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Create a New Recipe
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
              value={formData.title}
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
              value={formData.ingredients}
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
              value={formData.instructions}
              onChange={changeHandler}
              className="w-full resize-none px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-zinc-700 text-sm font-semibold mb-2">
              Preparation Time
            </label>
            <input
              type="text"
              name="time"
              placeholder="e.g., 30 minutes"
              value={formData.time}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

export default CreateRecipe