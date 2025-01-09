import useGetAllFav from '@/hooks/useGetAllFav';
import { setFavorite } from '@/store/reducer/authSlice';
import { USER_API_ } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Fav = () => {
  useGetAllFav()
  const dispatch = useDispatch();

  const { favorite, user } = useSelector((store) => store.auth);


  return (
    <div className="p-10 w-full h-full bg-white">
      <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        Your Favorite Recipes
      </h1>

      <div className="w-full max-h-[550px] overflow-auto p-4 rounded-md">
        <div className="flex flex-wrap gap-10 h-full w-full items-start">
          { favorite?.length > 0 ? (
            favorite?.map((recipe, index) => (
              <div
                key={index}
                className="bg-white w-[28%] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={recipe?.recipeImage}
                  alt={recipe?.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-zinc-800">{recipe?.title}</h2>
                  <p className="text-zinc-600 text-sm my-2">{recipe?.ingredients}</p>
                  <Link
                    className="bg-orange-500 px-3 mt-4 inline-block text-white font-semibold rounded-lg py-1"
                    to={`view/${recipe?._id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-600">No favorite recipes yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fav;
