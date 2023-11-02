import { createSlice } from '@reduxjs/toolkit';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle', // , "processing", "error", "success", "querying", "queryDone"
        message: null,
        users: [],
        requests: [],
        cards: [],
        ops: [],
        pPayments: []
    },
    reducers: {
        startProcess: (state) => {
            state.status = 'processing'
        },

        processFinishedUnsuccessfully: (state, {payload}) => {
            state.status = 'error'
            state.message = payload
        },

        processFinishedSuccessfully: (state, {payload}) => {
            state.status = 'success'
            state.message = payload
        },

        setIdle: (state) => {
            state.status = 'idle'
        },

        setQuerying: (state) => {
            state.status = 'querying'
        },

        queryDone: (state) => {
            state.status = 'queryDone'
        },

        emailSending: (state) => {
            state.status = 'emailSending'
        },

        emailSent: (state) => {
            state.status = 'emailSent'
        },

        emailNotSent: (state) => {
            state.status = 'emailNotSent'
        },

        fillRequests: (state, {payload}) => {
            state.requests = payload
        },

        fillUsers: (state, {payload}) => {
            state.users = payload
        },

        fillCards: (state, {payload}) => {
            state.cards = payload
        },

        fillDailyOp: (state, {payload}) => {
            state.ops = payload
        },

        fillpPayments: (state, {payload}) => {
            state.pPayments = payload
        },
    }
});

export const { startProcess, 
               processFinishedUnsuccessfully,
               processFinishedSuccessfully, 
               setIdle, 
               setQuerying, 
               fillRequests, 
               queryDone,
               emailSending,
               emailSent,
               fillUsers, 
               fillCards,
               fillDailyOp,
               emailNotSent,
               fillpPayments } = appSlice.actions;