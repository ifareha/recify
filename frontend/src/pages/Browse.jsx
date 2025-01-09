import RecipeCard from '@/components/ui/RecipeCard'
import useGetAllRecipe from '@/hooks/useGetAllRecipe'
import { setSearchQuery } from '@/store/reducer/recipeSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Browse = () => {
    useGetAllRecipe();
    const dispatch = useDispatch()

    useEffect(() =>{
        return ()=>{
         dispatch(setSearchQuery(""))
        }
     },[])
    return (
      <div className='w-full h-screen p-7 bg-white'>  
       <h1 className='text-3xl font-bold text-orange-500 mb-8 text-center'>
        Search Result
       </h1>        
         <RecipeCard />
      </div>
  
      
    )
}

export default Browse