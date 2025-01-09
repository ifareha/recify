import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetUserRecipe from '@/hooks/useGetUserRecipe';
import { userLogin, userLogOut } from '@/store/reducer/authSlice';
import { GET_ALL_RECIPE_API_, USER_API_ } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getdeleteRecipe } from '@/store/reducer/recipeSlice';

const Profile = () => {
  useGetUserRecipe() 
  const {user} = useSelector((store) => store.auth)
  const {allUsersRecipes} = useSelector((store) => store.recipe)


   const dispatch = useDispatch()
   const navigate = useNavigate()
  const [input, setInput] = useState({
    username:user?.username
  })
  const changeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }
  const submitHandler = async (e) => {
       e.preventDefault()
       const formDate = new FormData()
       formDate.append("username", input.username)
       try {
        const res = await axios.put(`${USER_API_}/update-profile`, formDate, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  
        });
        if(res.data.success){
          dispatch(userLogin(res.data.user));
          toast.success(res.data.message);
        }
       } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to update profile");        
       }
       console.log(input);
       
  }

  const logoutHandler = async (req, res) => {
    try {
      const res = await axios.get(`${USER_API_}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(userLogOut());
      
      navigate("/")
      toast.success(res.data.message);
      }
    } catch (error) {
      console.log();
      toast.error(error.response?.data?.message || "Failed to logout");
      
    }
  }
  const deletRecipe = async (recipeId) => {
    try {
        const res = await axios.delete(`${GET_ALL_RECIPE_API_}/delete/${recipeId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
          withCredentials: true,
        });
        if (res.data.success) {
         dispatch(getdeleteRecipe(res.data.recipe))
          navigate(`/profile`);
          toast.success("Recipe deleted successfully");
        }
      } catch (error) {
        console.error(error);
      }
}
  
  return (
    <div className='w-full mx-auto px-20 pt-10 bg-white h-full '>
       
        <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex h-24 w-24 text-5xl font-bold bg-zinc-300 rounded-full justify-center  items-center">
          {
            user?.username?.charAt(0).toUpperCase()
          }
        </div>
        <Button onClick={logoutHandler} className='absolute right-20'>LogOut</Button>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name: 
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
              {
                user?.username
              } </span>
            </h1>
          </div>
          
         
         
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={changeHandler
                    }
                    placeholder="username"
                    className="col-span-3"
                  />
                </div>
               
              </div>
              <DialogFooter>
              <Button onClick={submitHandler}>
              Save Change
             </Button>
            
                
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">My Recipies</h1>
        <div className="flex flex-wrap w-[98%] h-[60vh] overflow-auto gap-4 my-5">
          {allUsersRecipes.length === 0 ? (
            <h1>You haven't recipe</h1>
          ) : (
            allUsersRecipes.map((recipe,index) => (
              <Card key={index} className="w-[23%]">
              <CardHeader>
                <img src={recipe?.recipeImage} alt="" />
                <CardTitle>
                  {recipe?.title}
                </CardTitle>
               
                <CardDescription> {recipe?.ingredients}</CardDescription>
                
              </CardHeader>
             
              <CardFooter className='flex items-center justify-between'>
                <Link className="bg-zinc-300 px-3 text-zinc-700 font-semibold rounded-lg py-1" to={`/edit/${recipe._id}`}>Edit</Link>
                <Button
                      className="bg-red-500 px-3 text-red-200 font-semibold rounded-lg py-1"
                      onClick={() => deletRecipe(recipe._id)}
                    >
                      Delete
                    </Button>                             
                             </CardFooter>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile