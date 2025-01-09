import { Button } from '@/components/ui/button';
import { GET_ALL_RECIPE_API_ } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleRecipe } from '@/store/reducer/recipeSlice';

const ViewRecipe = () => {
  const params = useParams();
  const recipeId = params.id;
  const dispatch = useDispatch();
  const { singleRecipe } = useSelector((store) => store.recipe);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const getSingleRecipee = async () => {
      try {
        const res = await axios.get(`${GET_ALL_RECIPE_API_}/${recipeId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getSingleRecipe(res.data.recipe));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSingleRecipee();
  }, [dispatch, recipeId, user?._id]);

  if (!singleRecipe) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-start justify-center p-6">
        <div className="w-full flex items-start justify-around mb-5">
          <img
            src={singleRecipe.recipeImage}
            alt={singleRecipe.title || 'Recipe Image'}
            className="w-1/3 h-64 object-cover"
          />
          <div className='w-[60%]'>
            <div >
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-zinc-700">
                {singleRecipe.instructions?.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                )) || <li>No instructions available</li>}
              </ol>
            </div>
            <h4 className="text-orange-500 font-semibold mt-2">
              Time: {singleRecipe.time || 'Not specified'}
            </h4>
            <h4 className="text-zinc-500 font-semibold mt-6">
              Recipe created by: {singleRecipe?.userId?.username}
            </h4>
          </div>
        </div>

        <div className="ml-20">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">
            {singleRecipe.title }
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-800 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-700">
              {singleRecipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              )) || <li>No ingredients available</li>}
            </ul>
          </div>
          <div className="flex gap-5">
            <Link to="/">
              <Button className="bg-zinc-500 hover:bg-zinc-800">Back</Button>
            </Link>
          </div>
        </div>
      </div>

  );
};

export default ViewRecipe;
