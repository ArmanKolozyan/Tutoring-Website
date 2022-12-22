import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/main pages/Home";
import Register from "./pages/main pages/Register";
import Login from "./pages/main pages/Login";
import CreateTutoringSession from "./pages/tutoring posts/CreateTutoringSession";
import ViewTutoringSession from "./pages/tutoring posts/ViewTutoringSession";
import Footer from "./components/Footer";
import Trademark from "./components/Trademark";
import Navigationbar from "./components/Navigationbar";
import "./style.scss";
import MyProfile from "./pages/profile/MyProfile";
import ViewProfile from "./pages/profile/ViewProfile";
import CreateGroupSession from "./pages/group events/CreateGroupSession";
import ViewGroupSession from "./pages/group events/ViewGroupSession";
import ViewTutoringSessions from "./pages/tutoring posts/ViewTutoringSessions";
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
        element: <CreateTutoringSession />,
      },
      {
        path: "/createGroupPost",
        element: <CreateGroupSession />,
      },
      {
        path: "/tutoringPost/:id",
        element: <ViewTutoringSession />,
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
        element: <ViewTutoringSessions />,
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
