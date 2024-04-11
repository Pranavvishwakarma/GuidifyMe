import { Outlet, createBrowserRouter } from "react-router-dom";
import { NavBar, Footer } from "./components";
import Login from "./components/Login";
import About from "./components/About";
import Services from "./components/Services";
import Body from "./components/Body";
import Signup from "./components/Signup";
import { Home, CategoryPage, Post } from "./pages";
// import Categories from "./Pages/Category";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/",
        element: [
          <NavBar key="navbar" />,
          <Footer key="footer" />,
          <Body key="body" />,
        ],
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/category/:id",
        element: <CategoryPage />,
      },
    ],
  },
]);

export default App;
