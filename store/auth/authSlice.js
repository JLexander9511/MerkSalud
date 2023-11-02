import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // , "authenticated", "checking"
        uid: null,
        email: null,
        displayName: null,
        errorMessage: null,
        role: null
    },
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        login: (state, action) => {

            const {
                displayName, 
                email, 
                photoURL, 
                uid,
                role
            } = action.payload

            state.status = 'authenticated'
            state.uid = uid
            state.email = email
            state.displayName = displayName
            state.photoUrl = photoURL
            state.role = role
            state.errorMessage= null
        },
        logout: (state, { payload }) => {
            state.status= 'not-authenticated'
            state.uid= null
            state.email= null
            state.displayName= null
            state.role= null
            state.errorMessage= payload
        },
    }
});

export const { checkingCredentials, login, logout } = authSlice.actions;