import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import RepositoryCardPage from './pages/RepositoryCardPage';

export const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>,
  },
  {
    path:"/repository/:id",
    element: <RepositoryCardPage/>
  },
  // {
  //   path:"*",
  //   element: <ErrorPage/>
  // }
]);
