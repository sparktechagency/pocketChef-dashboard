import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import User from "../Pages/Dashboard/User";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Faq from "../components/ui/Settings/Faq";
import AboutUs from "../components/ui/Settings/AboutUs";
import UserRequest from "../Pages/Dashboard/UserRequest";
import RecipeManagement from "../Pages/Dashboard/Recipe/RecipeManagement";
import EditRecipe from "../Pages/Dashboard/Recipe/EditRecipe";
import AddRecipe from "../Pages/Dashboard/Recipe/AddRecipe";
import ManageCategory from "../Pages/Dashboard/Category/ManageCategory";
import ManageSubCategory from "../Pages/Dashboard/Category/ManageSubCategory";
import Template from "../Pages/Dashboard/Template";
import PrivateRoute from "./PrivateRoute";
import Ingredients from "../Pages/Dashboard/Ingredients/Ingredients";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/user/profile/:id",
        element: <User />,
      },

      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/recipe",
        element: <RecipeManagement />,
      },
      {
        path: "/category",
        element: <ManageCategory />,
      },
      {
        path: "/ingredients",
        element: <Ingredients />,
      },
      {
        path: "/sub-category",
        element: <ManageSubCategory />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe />,
      },
      {
        path: "/edit-recipe/:id",
        element: <EditRecipe />,
      },
      {
        path: "/template",
        element: <Template />,
      },
      {
        path: "/user-request",
        element: <UserRequest />,
      },

      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },

      {
        path: "/admin",
        element: <Admin />,
      },

      // {
      //   path: "/subscription",
      //   element: <Subscription />,
      // },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
