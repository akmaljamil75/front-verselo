import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import ProductPage from "../pages/Product";
import ProductCategory from "../pages/ProductCategory";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { isAuthenticated } from "../services/session.service";

export const router = createBrowserRouter(
    [
        {
            path : 'signin',
            loader : () => {
                if (isAuthenticated()) {
                    throw redirect("/manager");
                }
                return true;
            },
            element : <SignIn/>
        },
        {
            path : 'signup',
            element : <SignUp/>
        },
        {
            path : '*',
            element : <Navigate to="/dashboard" replace/>
        },
        {
            path : '',
            element : <ProtectedRoute/>,
            children : [
                {
                    path : '',
                    element : <Layout/>,
                    children : [
                        {
                            path : 'dashboard',
                            index : true,
                            element : <Dashboard/>
                        },
                        {
                            path : 'product-categories',
                            element : <ProductCategory/>
                        },
                        {
                            path : 'products',
                            element : <ProductPage/>
                        },
                    ]
                },
            ]
        }
    ]
)