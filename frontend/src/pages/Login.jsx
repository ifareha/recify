import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { USER_API_ } from "@/utils/constant"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, userLogin } from "@/store/reducer/authSlice"
import { store } from "@/store/store"
import { Loader2 } from "lucide-react"


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(store => store.auth)
  // const state = useSelector(store => store.auth)
  
  const [signUp, setsignUp] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
 const handleInputChange = (e, type) => {
  const {name, value} = e.target;
  
  if(type ==="signup") {
    setsignUp({...signUp, [name]: value})
  }
  else {
    setLogin({...login, [name]: value})
  }
 }
 const handleSignUpSubmit = async (e) => {
  e.preventDefault();
    
  const formData = new FormData();
  formData.append("username", signUp.username);
  formData.append("email", signUp.email);
  formData.append("password", signUp.password);


  try {
    const res = await axios.post(`${USER_API_}/register`, formData, {
      "headers": {
        "Content-Type" : "application/json"
      },
      withCredentials: true 
    });

    if (res.data.success) {
      toast.success(res.data.message);
      
    }
  } catch (error) {
    console.error("Error in SignUp Request:", error);
    toast.error(error.response?.data?.message || "SignUp failed");
  }
};
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
     const res = await axios.post(`${USER_API_}/login`,login ,  {
      "headers": {
        "Content-Type" : "application/json"
      },
      withCredentials: true 
    })
      if(res.data.success){
        dispatch(userLogin(res.data.user))
        toast.success(res.data.message);
        navigate("/")
      }
  
    } catch (error) {
     console.log(error);
     toast.error(error.response?.data?.message || "login failed");
     
    }
    finally{
      dispatch(setLoading(false));
    }


  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <Tabs defaultValue="login" className="w-[400px] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">SignUp</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
             Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input  type="text"
               name="username"
                value={signUp.username} 
                onChange={(e)=> handleInputChange(e, "signup")} 
             placeholder="Enter your username.." required={true}  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input name="email"   type="email" 
              value={signUp.email}
              onChange={(e)=> handleInputChange(e, "signup")} 
          placeholder="Enter your email.." required={true} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input name="password"  type="password"

              value={signUp.password}
              onChange={(e)=> handleInputChange(e, "signup")} 
          placeholder="Enter your password.." required={true}  />
            </div>
          </CardContent>
          <CardFooter>
          {
              loading ? <Button > <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait.. </Button>:<Button onClick={(e)=>handleSignUpSubmit(e)}>SignUp
          </Button>
            }

          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
             Login your password here. After signup, you'll be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input type="email" 
             name="email" 
             value={login.email}
             onChange={(e)=> handleInputChange(e, "login")} 
             placeholder="Enter your email.." required={true} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">password</Label>
              <Input name="password" type="password"
              value={login.password}
              onChange={(e)=> handleInputChange(e, "login")}
               placeholder="Enter your password.." />
            </div>
          </CardContent>
          <CardFooter>
            {
              loading ? <Button > <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait.. </Button>:<Button onClick={(e)=>handleLoginSubmit(e)}>Login
          </Button>
            }
          

          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Login