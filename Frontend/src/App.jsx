import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminFetchCustomers from "./AdminFetchCustomers";
import AdminFetchMechanic from "./AdminFetchMechanic";
import AdminFetchServices from "./AdminFetchServices";
import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";
import AdminPage from "./AdminPage";
import CustomerLogin from "./CustomerLogin";
import CustomerNav from "./CustomerNav";
import CustomerPage from "./CustomerPage";
import CustomerProfile from "./CustomerProfile";
import CustomerSignup from "./CustomerSignup";
import MapComponent from "./MapComponent";
import MechanicLogin from "./MechanicLogin";
import MechanicNav from "./MechanicNav";
import MechanicPage from "./MechanicPage";
import MechanicProfile from "./MechanicProfile";
import MechanicSignup from "./MechanicSignup";
import NewMapComponent from "./NewMapComponent";
import PendingMechanics from "./PendingMechanics";
import Role from "./Role";
import ServiceStatus from "./ServiceStatus";


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
      element:<><MechanicPage/>  </>
    },
    {
      path: "/map-component",
      element: <MapComponent />
    },
    {
      path: "/new-map",
      element: <NewMapComponent />
    },
    // {
    //   path: "/logout",
    //   element: <Logout /> // Add Logout route
    // },
    {
      path: "/customer-page/profile",

      element: <><CustomerNav/><CustomerProfile /> </>
    },
    {
      path: "/mechanic-page/profile",

      element: <><MechanicNav/><MechanicProfile /> </>
    },
  
    {
      path: "/service-status",

      element: <ServiceStatus/>
    }, {
      path: "/admin-login",

      element: <AdminLogin/>
    }, {
      path: "/admin-dashboard",

      element: <><AdminNav/><AdminPage/></>
    },
      {
      path: "/admin-dashboard",

      element: <AdminPage/>
    },
    {
      path: "/admin/mechanics",

      element: <AdminFetchMechanic/>
    },
    {
      path: "/admin/customers",

      element: <AdminFetchCustomers/>
    },
    {
      path: "/admin/services",

      element: <AdminFetchServices/>
    },
    {
      path: "/admin/pending-mechanics",

      element: <PendingMechanics/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
