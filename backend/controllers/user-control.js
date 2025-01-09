import User from '../models/user-model.js'
import bcrypt from 'bcrypt' 
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
   console.log(username, email, password);
   
      if (!username || !email || !password)
        
        return res.status(400).json({
          success: false,
          message: "Please fill in all fields",
        });
      const user = await User.findOne({ email: email });
      if (user)
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username,
          email,
          password : hashPassword
        });
    
  
     return res.status(201).json({
        success: true,
        message: "Account registered successfully",
      });
       
    } catch (error) {
      // return res.status(500).json({ 
      //     success: false,
      //     message: "failed to register",
      //   });
        console.log(error);
        
      
    }
};
export const login =async (req, res) => {
    try {
        const {email, password} = req.body;
    if (!email ||!password) {
        return res.status(400).json({ success: false, message: "Please enter email and password" });
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
        });
    }
    generateToken(res, user);
   

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }


};
export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
       
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
};
export const userProfile =async (req, res) => {
    try {
        const userId = req.id;        
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
        
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { username } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const updateName = {username};
        const updateUser = await User.findByIdAndUpdate(userId, updateName, {new: true});
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updateUser,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
}
export const favoriteRecipe = async (req, res) => {
    try {
      const userId = req.body.id;
      console.log(userId);      
      const recipeId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {        
        return res.status(404).json({ success: false, message: "User not found" });

      }
      if (user.favorites.includes(recipeId)) {
        await User.findByIdAndUpdate(userId, {
            $pull:{favorites: recipeId}
        });
        return res.status(200).json({ success: true, message: "Recipe removed from favorites" });
      }
      await User.findByIdAndUpdate(userId, {
        $push:{favorites: recipeId}
      })
      return res.status(200).json({ success: true, message: "Recipe added to favorites" });
    } catch (error) {
        
    }
}
export const getFavoriteRecipe = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, 
            message: "Favorites fetched successfully",
            favorites: user.favorites,
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "can not fetch data" });
    }
}