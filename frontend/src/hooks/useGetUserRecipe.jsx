import { getAllRecipes, getAllUsersRecipes } from '@/store/reducer/recipeSlice';
import { GET_ALL_RECIPE_API_ } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetUserRecipe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllRecipe = async () => {
      try {
        const res = await axios.get(`${GET_ALL_RECIPE_API_}/my-recipes`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getAllUsersRecipes(res.data.recipe)); 
        
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch recipes");
      }
    };

    getAllRecipe();
  }, [dispatch, GET_ALL_RECIPE_API_]);
};

export default useGetUserRecipe;
