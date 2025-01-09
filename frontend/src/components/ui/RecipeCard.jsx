import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import useGetAllRecipe from "@/hooks/useGetAllRecipe";
import { setFavorite } from "@/store/reducer/authSlice";
import { USER_API_ } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Button } from "./button";
import { toast } from "sonner";
  

const RecipeCard = () => {
  const {allRecipes} = useSelector((store) => store.recipe)
  const {user, favorite} = useSelector((store) => store.auth)
  const dispatch = useDispatch()


  const favHandler = async (recipeId) => {
try {
  const res = await axios.put(`${USER_API_}/favorite/${recipeId}`, {id:user._id}, {
    withCredentials: true
  })
  if (res.data.success) {
dispatch(setFavorite(res.data.favorites))

    toast.success(res.data.message)
  }
} catch (error) {
  console.log(error);
}
  }
  const isFav = (recipeId) =>{
    return favorite?.includes(recipeId);
  }
   
  return (
    <div className="w-full h-full px-12 mt-10">
       
        <div className="w-full mx-auto h-[60%] overflow-auto flex gap-8 flex-wrap">
          {
            allRecipes.map((recipe, index) =>{
              return         <Card key={index} className="w-[23%]">
              <CardHeader>
                <img src={recipe?.recipeImage} alt="" />
                <CardTitle>
                  {recipe?.title}
                </CardTitle>
                <h4 className="text-orange-800 font-semibold text-sm">
                  Recipe created by : {
                    recipe?.userId?.username
                  }
                </h4>
                <CardDescription> {recipe?.ingredients}</CardDescription>
                
              </CardHeader>
             
              <CardFooter className='flex items-center justify-between'>
              {user ? (
                  <Button onClick={() => favHandler(recipe._id)}>
                    {isFav(recipe._id) ? "Remove" : "Save"}
                  </Button>
                ) : (
                  ""
                )}
                <Link className="bg-zinc-300 px-3 text-zinc-700 font-semibold rounded-lg py-1" to={`view/${recipe._id}`}>View</Link>
              </CardFooter>
            </Card>
            })
          }

</div>
    </div>
  )
}

export default RecipeCard