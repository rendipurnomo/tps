import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Layout from './components/Layout'
import Data from './components/Data';
import Absen from './components/Absen';
import Hasil from './components/Hasil';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Data />,
      },
      {
        path: "absen",
        element: <Absen />,
      },
      {
        path: "hasil",
        element: <Hasil />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />
}

export default App;
