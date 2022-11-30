import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AdminDashboard from "../../PrivateRoutes/AdminDashboard";
import BuyerDashboard from "../../PrivateRoutes/BuyerDashboard";
import PrivateRoutes from "../../PrivateRoutes/PrivateRoutes";
import SellerDashboard from "../../PrivateRoutes/SellerDashboard";
import AddProduct from "../AddProduct/AddProduct";
import AllBuyers from "../AllBuyers/AllBuyers";
import AllSellers from "../AllSellers/AllSellers";
import Blog from "../Blog/Blog";
import Dashboard from "../Dashboard/Dashboard";
import DashboardContent from "../DashboardContent/DashboardContent";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Home/Home";
import MyOrders from "../MyOrders/MyOrders";
import MyProducts from "../MyProducts/MyProducts";
import SelectProducts from "../SelectProducts/SelectProducts";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/signin", element: <Signin></Signin> },
            { path: "/signup", element: <Signup /> },
            {
                path: "/selectProducts/:name",
                loader: ({ params }) => fetch(`https://resell-bike-guru.vercel.app/products/${params.name}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }),
                element: <PrivateRoutes><SelectProducts /></PrivateRoutes>
            },
            { path: "/blog", element: <Blog /> }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            { path: "/dashboard", element: <DashboardContent></DashboardContent> },
            { path: "/dashboard/myOrders", element: <BuyerDashboard><MyOrders /></BuyerDashboard> },
            { path: "/dashboard/addProduct", element: <SellerDashboard><AddProduct /> </SellerDashboard> },
            { path: "/dashboard/myProduct", element: <SellerDashboard><MyProducts /></SellerDashboard> },
            { path: "/dashboard/allSellers", element: <AdminDashboard><AllSellers /></AdminDashboard> },
            { path: "/dashboard/allBuyers", element: <AdminDashboard><AllBuyers /></AdminDashboard> },
        ]
    }
]);