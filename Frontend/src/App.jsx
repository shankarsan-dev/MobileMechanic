import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
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
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
