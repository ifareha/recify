import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    favorite: []
}
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLoading: (state, action) =>{
            state.loading = action.payload;
        },
        userLogin: (state, action)=>{
  state.user = action.payload;
  state.isAuthenticated = true;
        },
        userLogOut: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
        },
        setRecipe: (state, action) =>{
            state.recipe = action.payload;
        },
        setFavorite: (state, action) => {
            state.favorite = action.payload;
            
        }
    }
})


export const {userLogOut, userLogin, setRecipe, setLoading, setFavorite} =  authSlice.actions;

export default authSlice.reducer;