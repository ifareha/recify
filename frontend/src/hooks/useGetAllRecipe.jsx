import { getAllRecipes } from '@/store/reducer/recipeSlice';

import { GET_ALL_RECIPE_API_ } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetAllRecipe = () => {
  const dispatch = useDispatch();
const {searchedQuery} = useSelector((store) => store.recipe)

  useEffect(() => {
    const getAllRecipe = async () => {
      try {
        const res = await axios.get(`${GET_ALL_RECIPE_API_}/?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getAllRecipes(res.data.recipe)); 

         

        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch recipes");
      }
    };

    getAllRecipe();
  }, [dispatch,searchedQuery]);
};

export default useGetAllRecipe;
