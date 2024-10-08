import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout