import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import chatSlice  from './slices/chatSlice';

export default configureStore({
  reducer: {
    userLogininfo:userSlice,
    activeChatInfo:chatSlice,
  },
})