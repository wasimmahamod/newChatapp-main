import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chatActive',
    initialState: {
        chat: localStorage.getItem('activeChat')?JSON.parse(localStorage.getItem('activeChat')):null,
    },
    reducers: {
        activeChatInfo: (state, action) => {
            state.chat = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { activeChatInfo} = chatSlice.actions

export default chatSlice.reducer