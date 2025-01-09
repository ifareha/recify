import express from "express";
import upload from "../utils/multer.js";
import { uploadImage } from "../utils/cloudnary.js";

const router = express.Router();

router.route("/upload-cover").post(upload.single("recipeImage"), async(req, res) => {
    try {
        const image = await uploadImage(req.file.path);
        console.log(req.file);

        res.json({
            success: true,
            message: "Image uploaded successfully",
            image: image.secure_url,
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Failed to upload image",
            success: false,
        })
    }
})

export default router;