import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/HomePage/HomePage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";




export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path:'/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
            
        ]
    }
])