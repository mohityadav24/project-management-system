import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    user: null,
    token:null,
    loading:false,
    error:null,
};


const authSlice = createSlice({
    name : 'auth',
    initialState,

    reducers:{

        loginRequest: (state) => {state.loading = true},
        registerRequest:(state) => {state.loading = true},


        // success 
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;

        },

        registerSuccess : (state) => {
            state.loading = false;
            state.error = null;
        },

        // fail

        loginFailure: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        },


        registerFailure : (state, action) =>  {
            state.loading = false,
            state.error = action.payload;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    }
});


export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logout,


} = authSlice.actions;


export default authSlice.reducer;