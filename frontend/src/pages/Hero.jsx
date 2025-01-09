import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RecipeCard from '@/components/ui/RecipeCard'
import useGetAllRecipe from '@/hooks/useGetAllRecipe'
import { setSearchQuery } from '@/store/reducer/recipeSlice'
import { store } from '@/store/store'
import { Bookmark, BookMarked, Save, SaveIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Hero = () => {
  const {user} = useSelector((store) => store.auth);
  const [searchQuery, setSearchedQuery] = useState("")
  const dispatch = useDispatch();
 const navigate = useNavigate()

 useGetAllRecipe()
  const handleSearchQuery = () => {
    dispatch(setSearchQuery(searchQuery));
    navigate("browse")
  }
  return (
    <div className='w-full h-screen p-7 bg-white'>
       <div className='w-full flex items-center justify-between px-5 '>
       <div className='flex items-center w-[40%] ml-10 gap-3'>
       <Input 
        value={searchQuery}
       name="search" 
       placeholder="Search" 
       onChange={(e) => setSearchedQuery(e.target.value)}
       />
       <SearchIcon className='cursor-pointer' onClick={handleSearchQuery}/>
       </div>
       {
        user? (<div className='flex items-center gap-10 '>
          <Link className='text-white font-semibold bg-orange-500 py-2 px-4 rounded-lg' to="create" >
          Add Recipe</Link>
           <Link to="profile" className='text-2xl rounded-full py-3 px-5 bg-zinc-400 font-bold text-white'>
            {
              user?.username?.charAt(0).toUpperCase()
            }
           </Link>
           <Bookmark size={30} />
           </div>) :(
           <div className='flex items-center gap-5'>
             <Link className='text-white font-semibold bg-orange-500 py-2 px-4 rounded-lg' to="login" >
             Login/SignUp</Link>
             
           </div>
           )
       }
       
      
       </div>
       <div className='mt-10 px-12'>
        <h1 className='text-4xl font-semibold text-gray-800'>Recify Recipes</h1>
        <p className='text-gray-600 w-1/2 mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati officia eos blanditiis cumque sequi, deleniti id quasi sunt eligendi laudantium? </p>
        
       </div>
       
       <div className='mt-10 ml-10'>
        <h1 className='text-xl font-semibold text-gray-800'>Popular Recipes</h1>
       </div>
       <RecipeCard />
    </div>

    
  )
}

export default Hero