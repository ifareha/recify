import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleRecipe: null,
    allRecipes: [],
    allUsersRecipes: [],
     searchedQuery : ""
}

const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState,
    reducers:{
        getAllRecipes: (state, action) => {
            state.allRecipes = action.payload;
           
        },
        getSingleRecipe: (state, action) => {
            state.singleRecipe = action.payload;
        },
        getAllUsersRecipes: (state, action) => {
            state.allUsersRecipes = action.payload;
        },
        editRecipe: (state, action) => {
            const index = state.allUsersRecipes.findIndex((recipe) => recipe._id === action.payload._id);
            if(index !== -1){
                state.allUsersRecipes[index] = action.payload;
            }
            state.singleRecipe = action.payload;

        },
        getdeleteRecipe: (state, action) => {
            const index = state.allUsersRecipes.findIndex((recipe) => recipe._id === action.payload);
            if(index!== -1){
                state.allUsersRecipes.splice(index, 1);
            }
    
            if(state.singleRecipe && state.singleRecipe._id === action.payload){
                state.singleRecipe = null;
            }
    
        },
        setSearchQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }

    }
})

export const { getAllRecipes, getSingleRecipe, getAllUsersRecipes, editRecipe , getdeleteRecipe, setSearchQuery} = recipeSlice.actions;

export default recipeSlice.reducer;


