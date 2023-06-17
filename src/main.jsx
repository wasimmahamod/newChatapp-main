import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import store from './store.js';
import { Provider } from 'react-redux'
import firebaseConfig from './firebaseConfig.js';
import Singup from './pages/Singup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Friends from './pages/Friends.jsx';
import Profile from './pages/Profile.jsx';
import People from './pages/People.jsx';
import Group from './pages/Group.jsx';
import Chat from './pages/Chat.jsx';
import Setting from './pages/Setting.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/singup",
    element: <Singup/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/friend",
    element: <Friends/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/people",
    element: <People/>,
  },
  {
    path: "/group",
    element: <Group/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
  {
    path: "/setting",
    element: <Setting/>,
  },
  {
    path: "/forget",
    element: <ForgetPassword/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
       <RouterProvider router={router} />
  </Provider>
)
