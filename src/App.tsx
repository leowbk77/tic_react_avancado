import './styles/output.css'
import Home from './app/view/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './app/components/Layout';
import ShoppingCart from './app/view/ShoppingCart';
import { ShoppingCartProvider } from './app/contexts/ShoppingCartContext';
import Login from './app/view/Login';
import SignUp from './app/view/SignUp';


function App() {
  const route = createBrowserRouter([
    {
      path: "/register",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      element: <Layout />,
      children: [
          {path: "/", element: <Home />,},
          {path: "/cart", element: <ShoppingCart />},
      ],
    },
  ]);

  return (
          <div className='flex justify-center items-center bg-gray-200 h-screen'>
            <ShoppingCartProvider>
              <RouterProvider router={route}/>
            </ShoppingCartProvider>
          </div>
  );
}

export {App};
