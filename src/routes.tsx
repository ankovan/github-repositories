import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import RepositoryCardPage from './pages/RepositoryCardPage';

export const router = createBrowserRouter([
  {
    path:"/github-repositories/",
    element: <Home/>,
  },
  {
    path:"/github-repositories/repository/:id",
    element: <RepositoryCardPage/>
  },
  // {
  //   path:"*",
  //   element: <ErrorPage/>
  // }
]);
