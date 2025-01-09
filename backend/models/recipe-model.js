import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
       
    },
    ingredients: {
        type: Array,
        required: true,
       
    },
    instructions: {
        type: Array,
        required: true,
       
    },
    recipeImage:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

    time:{
        type: String,
      
    }
}, {timestamps:true})

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;