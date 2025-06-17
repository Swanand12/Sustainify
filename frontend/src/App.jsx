import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import CurrentBids from "./pages/CurrentBids";
import { Toaster } from "react-hot-toast";
import UserRoute from "./protectedRoutes/UserRoute";
import BidActivity from "./pages/BidActivity";
import ViewPlacedBids from "./pages/ViewPlacedBids";
import Authentication from "./pages/Authentication";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/auth",
      element: <Authentication />,
    },
    {
      path: "/sustainify",
      element: <UserRoute />,
      children: [
        {
          path: "dashboard",
          element: <DashBoard />,
        },
        {
          path: "bids",
          element: <CurrentBids />,
        },
        {
          path: "activity",
          element: <BidActivity />,
        },
        {
          path: "activity/:bid",
          element: <ViewPlacedBids />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
