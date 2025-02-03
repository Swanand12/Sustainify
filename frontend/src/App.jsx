import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import CurrentBids from "./pages/CurrentBids";
import { Toaster } from "react-hot-toast";
import UserRoute from "./protectedRoutes/UserRoute";
import MyBids from "./pages/MyBids";
import ViewTransactions from "./pages/ViewTransactions";
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
               path: "my-bids",
               element: <MyBids />,
            },
            {
               path: "my-bids/:bid",
               element: <ViewTransactions />,
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
