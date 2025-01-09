import { setFavorite } from '@/store/reducer/authSlice';
import { getAllRecipes } from '@/store/reducer/recipeSlice';

import { GET_ALL_RECIPE_API_, USER_API_ } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetAllFav = () => {
  const dispatch = useDispatch();
const { favorite, user } = useSelector((store) => store.auth);
const { allRecipes } = useSelector((store) => store.recipe);

useEffect(() => {
  const fetchFavRecipe = async () => {
    try {
      const res = await axios.get(`${USER_API_}/favorite`, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log(res.data.favorites);
        
        dispatch(setFavorite(res.data.favorites)); 
      }
      else{
        dispatch(setFavorite([]))
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

 
    fetchFavRecipe();
}, [ dispatch]);
};

export default useGetAllFav;
