import express from 'express';
import { createRecipe, deleteRecipe, editRecipe, getAllUserRecipes, getRecipe, getRecipeById } from '../controllers/recipe-control.js';
import isLoggedIn from '../middleware/islogIn.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route("/create").post(upload.single("recipeImage"), isLoggedIn,createRecipe)
router.route("/").get(getRecipe)
router.route("/my-recipes").get(isLoggedIn, getAllUserRecipes)
router.route("/:id").get(getRecipeById)
router.route("/delete/:id").delete(deleteRecipe)
router.route("/edit/:id").put(upload.single("recipeImage"), isLoggedIn, editRecipe)



export default router;