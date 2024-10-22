import './styles/output.css'
import Header  from './app/components/Header';
import Home from './app/view/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Header />
        <Home />
      </>,
    },
  ]);

  return (
          <div className='flex justify-center items-center bg-gray-200 h-screen'>
            <RouterProvider router={route}/>
          </div>
  );
}

export {App};
