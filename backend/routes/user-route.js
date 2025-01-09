import express from 'express';
import { favoriteRecipe, getFavoriteRecipe, login, logout, register, updateProfile, userProfile } from '../controllers/user-control.js';
import isLoggedIn from '../middleware/islogIn.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile").get(upload.single("recipeImage"),isLoggedIn, userProfile)
router.route("/update-profile").put(isLoggedIn, updateProfile)
router.route("/favorite/:id").put(isLoggedIn, favoriteRecipe)
router.route("/favorite").get(isLoggedIn, getFavoriteRecipe)
router.route("/logout").get(logout)

export default router;