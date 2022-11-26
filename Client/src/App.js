import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Compose from "./pages/Compose";
import CreateSession from "./pages/CreateSession";
import ViewSession from "./pages/ViewSession";
import Post from "./pages/Post";
import Footer from "./components/Footer";
import Trademark from "./components/Trademark";
import Navigationbar from "./components/Navigationbar";
import "./style.scss";
import MyProfile from "./pages/MyProfile";
// Using an Outlet component of React to avoid
// duplication of Navbar and Footer at every page
// that needs a navbar and a footer.
function Layout1() {
  return (
    <>
      <Navigationbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

function Layout2() {
  return (
    <>
      <Trademark/>
      <Outlet/>
    </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout1/>,
    children: [
      {
        path: "/",
        element: <Home/>

      },
      {
        path: "/post/:id", // if you type "localhost:"portNumber"/post/1345" in the url bar, where 1345 is some id number you will trigger the "Post" React component
        element: <Post/>
      },
      {
        path: "/compose",
        element: <Compose/>
      },
      {
        path: "/createSession",
        element: <CreateSession/>
      },
      {
        path: "/session/:id",
        element: <ViewSession/>
      },
      {
        path: "/Profile",
        element: <MyProfile/>
      }
    ],
  },
  {
    path: "/",
    element: <Layout2/>,
    children: [
      {
        path: "/register",
        element: <Register/>,
      },
      { 
        path: "/login",
        element: <Login/>,
      },
    ],
  },
]);


function App() {
  return (
    <div className="app"> 
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
