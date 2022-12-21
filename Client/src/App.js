import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateTutoringSession from "./pages/CreateTutoringSession";
import ViewTutoringSession from "./pages/ViewTutoringSession";
import ViewSummaries from "./pages/ViewSummaries";
import Footer from "./components/Footer";
import Trademark from "./components/Trademark";
import Navigationbar from "./components/Navigationbar";
import "./style.scss";
import MyProfile from "./pages/MyProfile";
import ViewProfile from "./pages/ViewProfile";
import CreateGroupSession from "./pages/CreateGroupSession";
import ViewGroupSession from "./pages/ViewGroupSession";
import ViewTutoringSessions from "./pages/ViewTutoringSessions";
import ViewGroupSessions from "./pages/ViewGroupSessions";
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
        path: "/createTutoringSession",
        element: <CreateTutoringSession />,
      },
      {
        path: "/createGroupSession",
        element: <CreateGroupSession />,
      },
      {
        path: "/tutoringSession/:id",
        element: <ViewTutoringSession />,
      },
      {
        path: "/groupSession/:id",
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
        path: "/summaries",
        element: <ViewSummaries />,
      },
      {
        path: "/tutoringsessions",
        element: <ViewTutoringSessions />,
      },
      {
        path: "/groupsessions",
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
