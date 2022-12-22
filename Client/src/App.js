import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/main pages/Home";
import Register from "./pages/main pages/Register";
import Login from "./pages/main pages/Login";
import CreateTutoringPost from "./pages/tutoring posts/CreateTutoringPost";
import ViewTutoringPost from "./pages/tutoring posts/ViewTutoringPost";
import Footer from "./components/Footer";
import Trademark from "./components/Trademark";
import Navigationbar from "./components/Navigationbar";
import "./style.scss";
import MyProfile from "./pages/profile/MyProfile";
import ViewProfile from "./pages/profile/ViewProfile";
import CreateGroupSession from "./pages/group events/CreateGroupSession";
import ViewGroupSession from "./pages/group events/ViewGroupSession";
import ViewTutoringPosts from "./pages/tutoring posts/ViewTutoringPosts";
import ViewGroupSessions from "./pages/group events/ViewGroupSessions";
import ScrollToTop from "./components/ScrollToTop";

// Using an Outlet component of React to avoid
// duplication of Navbar and Footer at every page
// that needs a navbar and a footer.
function Layout1() {
  return (
    <>
      <ScrollToTop />
      <Navigationbar />
      <Outlet />
      <Footer />
    </>
  );
}

function Layout2() {
  return (
    <>
      <ScrollToTop />
      <Trademark />
      <Outlet />
    </>
  );
}

// ALL PATHS AND CORRESPONDING ELEMENTS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout1 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/createTutoringPost",
        element: <CreateTutoringPost />,
      },
      {
        path: "/createGroupPost",
        element: <CreateGroupSession />,
      },
      {
        path: "/tutoringPost/:id",
        element: <ViewTutoringPost />,
      },
      {
        path: "/groupPost/:id",
        element: <ViewGroupSession />,
      },
      {
        path: "/ViewProfile/:id",
        element: <ViewProfile />,
      },
      {
        path: "/profile/:firstname",
        element: <MyProfile />,
      },
      {
        path: "/tutoringPosts",
        element: <ViewTutoringPosts />,
      },
      {
        path: "/groupPosts",
        element: <ViewGroupSessions/>,
      },
    ],
  },
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
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
