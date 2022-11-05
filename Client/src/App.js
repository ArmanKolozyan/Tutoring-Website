import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Compose from "./pages/Compose"
import Post from "./pages/Post"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"

// Using an Outlet component of React to avoid
// duplication of Navbar and Footer at every page
// that needs a navbar and a footer.
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
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
    ],
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
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
