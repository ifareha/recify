import { log } from "console";
import Recipe from "../models/recipe-model.js";
import { deleteImage, uploadImage } from "../utils/cloudnary.js";
import path from 'path'

export const createRecipe = async (req, res) => {
   try {
    const {title, instructions, ingredients, time } = req.body;
    const coverImage = await uploadImage(req.file.path);

    
    if(!coverImage) {
        return res.status(400).json({ message: "Failed to upload cover image" });
    }
   
    if(!title || !instructions || !ingredients ){
        return res.status(400).json({ message: "All fields are required" });
    }

    const recipeCreate = Recipe.create({
        title,
        instructions,
        ingredients,
        time,
        recipeImage: coverImage.secure_url,
        userId: req.userId,
    })
    console.log(recipeCreate);
    
    res.status(201).json(

        { 
            success: true,  message: "Recipe created successfully",  recipeCreate,
         }
    );

   } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
    
   }


}
export const getRecipe =async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query =  {
            $or :[
                {title: {$regex: keyword, $options: 'i'}},
                {ingredients: {$regex: keyword, $options: 'i'}},
                {instructions: {$regex: keyword, $options: 'i'}},
            ]
        }
        const recipe = await Recipe.find(query).populate('userId').sort({
            createdAt: -1,
        })
        return res.json(
            {
                success: true,
                recipe,
                message:"All recipes fetched successfully"
            }
        )
    } catch (error) {
        
      console.log(error);
      
    }
}
export const getAllUserRecipes = async (req, res) => {
    try {
   const recipe =  await Recipe.find({userId:req.userId})
   console.log(req.userId);
   
   return res.json({
        success: true,
        recipe,
        message:"User's recipes fetched successfully"
    })
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user recipes',
          })
    }
}
export const getRecipeById = async (req, res) => {
    try {
        const recipeId = req.params.id;
    
        const recipe = await Recipe.findById(recipeId);
        if(!recipe){
            return res.json({ message: "Recipe not found" });
        }
        return res.json({
            success: true,
            recipe,
            message:"Recipe fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to get recipe by Id"
        })
    }
}
export const editRecipe =async (req, res) => {
    try {
     const {title, instructions, ingredients, time} = req.body;
     const recipeId = req.params.id;
     const recipeImage = req.file;

     let recipe = Recipe.findById(recipeId)
     if(!recipe){
        return res.json({
            success: false,
            message: "Recipe not found"

        });
     }

     let recipeThumbnail

     if(recipeImage){
        if(recipe.recipeImage){
            const imageId = recipe.recipeThumbnail.split("/").pop().split(".")[0];
            await deleteImage(imageId)
        }
        recipeThumbnail = await uploadImage(recipeImage.path);
     }
     
     const updateRecipe = {title, instructions, ingredients, time, recipeImage: recipeThumbnail?.secure_url  };
     recipe = await Recipe.findByIdAndUpdate(recipeId, updateRecipe,{new: true})
     return res.status(200).json({
        success: true,
        recipe,
        message:"recipe updated successfully"
    }) 

    } catch (error) {
        return res.status(404).json({ 
            success: false,
          
             message: " recipe not found", error: error });
    }
}
export const deleteRecipe = async (req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findById(id);
        if(!recipe){
            return res.json({ message: "Recipe not found" });
        }
        if(recipe.recipeImage){
            const imageId = recipe.recipeImage.split("/").pop().split(".")[0];
            await deleteImage(imageId);
        }
        await Recipe.findByIdAndDelete(id);
        return res.status(200).json({ message: "Recipe deleted successfully" });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Could not delete the recipe.' });
    }
}