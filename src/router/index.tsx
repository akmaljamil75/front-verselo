import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import ProductPage from "../pages/Product";
import ProductCategory from "../pages/ProductCategory";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TransactionPage from "../pages/Transaction";
import LandingPage from "../pages/LandingPage";
import PublicTransaction from "../pages/PublicTransaction";
import MidtransPayment from "../pages/MidtransPayment";
import { isAuthenticated } from "../services/session.service";

export const router = createBrowserRouter(
    [
        {
            path : '/',
            element : <LandingPage/>
        },
        {
            path : 'public/transactions',
            element : <PublicTransaction/>
        },
        {
            path : 'public/payment/:productId',
            element : <MidtransPayment/>
        },
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
            element : <Navigate to="/" replace/>
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
                        {
                            path : 'transactions',
                            element : <TransactionPage/>
                        },
                    ]
                },
            ]
        }
    ]
)