import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";

const Layout = () => {
  return (
    <div>
        <Nav />
        <Outlet />
    </div>
  )
}

export default Layout