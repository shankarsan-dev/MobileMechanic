import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import CustomerPage from "./CustomerPage";
import CustomerSignup from "./CustomerSignup";
import MechanicLogin from "./MechanicLogin";
import MechanicPage from "./MechanicPage";
import MechanicSignup from "./MechanicSignup";
import Role from "./Role"; // Import Role component
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Role />
    },
    {
      path: "/customer-login",
      element: <CustomerLogin />
    },{
    path: "/customer-signup",
    element:<CustomerSignup/>
    },
    {
      path: "/customer-page",
      element:<CustomerPage/>
      },{
      path: "/mechanic-signup",
      element:<MechanicSignup/>
      },
      {
      path: "/mechanic-login",
      element:<MechanicLogin/>

      },
      {
        path: "/mechanic-page",
        element:<MechanicPage/>
  
        },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
