import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Layout from './components/Layout'
import Data from './components/Data';
import Absen from './components/Absen';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Data />,
      },
      {
        path: "absen",
        element: <Absen />,
      },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />
}

export default App;
