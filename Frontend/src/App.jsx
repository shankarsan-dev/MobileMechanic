import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import CustomerNav from "./CustomerNav";
import CustomerPage from "./CustomerPage";
import CustomerProfile from "./CustomerProfile";
import CustomerSignup from "./CustomerSignup";
import MapComponent from "./MapComponent";
import MechanicLogin from "./MechanicLogin";
import MechanicPage from "./MechanicPage";
import MechanicSignup from "./MechanicSignup";
import Role from "./Role";


const App = () => {

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Role />
    },
    {
      path: "/customer-login",
      element: <CustomerLogin />
    },
    {
      path: "/customer-signup",
      element: <CustomerSignup />
    },
    {
      path: "/customer-page",
      element: <CustomerPage />
    },
    {
      path: "/mechanic-signup",
      element: <MechanicSignup />
    },
    {
      path: "/mechanic-login",
      element: <MechanicLogin />
    },
    {
      path: "/mechanic-page",
      element: <MechanicPage />
    },
    {
      path: "/map-component",
      element: <MapComponent />
    },
    // {
    //   path: "/logout",
    //   element: <Logout /> // Add Logout route
    // },
    {
      path: "/customer-page/profile",

      element: <><CustomerNav/><CustomerProfile /> </>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
