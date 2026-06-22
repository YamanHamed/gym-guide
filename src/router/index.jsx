import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/userPages/Home";
import Library from "../pages/userPages/Library";
import MusclePage from "../pages/userPages/MusclePage";
import Splits from "../pages/userPages/Splits";
import Split from "../pages/userPages/Split";
import Tips from "../pages/userPages/Tips";
import AICoach from "../pages/userPages/AICoach";
import Login from "../pages/adminPages/Login";
import DashboardHome from "../pages/adminPages/DashboardHome";
import BrowsePage from "../pages/adminPages/BrowsePage";
import CreatePage from "../pages/adminPages/CreatePage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "library", element: <Library /> },
      { path: "library/:muscle", element: <MusclePage /> },
      { path: "splits", element: <Splits /> },
      { path: "splits/:name", element: <Split /> },
      { path: "tips", element: <Tips /> },
    ],
  },
  {
    path: "/aicoach",
    element: <UserLayout hideFooter={true} mainClassName="pb-0" />,
    children: [{ index: true, element: <AICoach /> }],
  },
  {
    path: "/dashboard/login",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: ":type", element: <BrowsePage /> },
          { path: "create/:type", element: <CreatePage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
]);

export default router;
