import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import {Layout,RequireAuth} from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from './routes/newPostPage/newPostPage'
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import AboutPage from "./routes/About/About";
import ContactPage from "./routes/Contact/Contact"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:'/about',
          element:<AboutPage/>
        },
        {
          path:'/contact',
          element:<ContactPage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader,
          errorElement:<ErrorPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader,
          errorElement:<ErrorPage/>
        },
        
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
        path:"/error",
        element:<ErrorPage/>
        }
      ]
    },{
      path:'/',
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader:profilePageLoader,
          errorElement:<ErrorPage/>
        },{
          path:'/profile/update',
          element:<ProfileUpdatePage/>
        },{
          path:'/add',
          element:<NewPostPage/>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
