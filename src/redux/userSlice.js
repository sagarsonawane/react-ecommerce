import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        login : (state, action) => {
            state.user = action.payload; //example { id: 1, name: "John Doe", email: "abd@dfg.com}
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;   
export const userReducer = userSlice.reducer;
// The userSlice manages the authentication state of the user in the application.