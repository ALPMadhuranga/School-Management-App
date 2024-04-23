import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'


const Navbar = () => {

  const linkClass = ({ isActive }) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <>
      <nav className="bg-blue-600 border-b border-blue-400">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* <!-- Logo --> */}
              <NavLink
                className="flex flex-shrink-0 items-center mr-4"
                to="/"
              >
                <img
                  className="h-12 w-auto"
                  src={logo}
                  alt="School Management App"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  School Management System
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink
                    to="/"
                    className={linkClass}
                  >
                    Student Record
                  </NavLink>
                  <NavLink
                    to="/student"
                    className={linkClass}
                  >
                    Student
                  </NavLink>
                  <NavLink
                    to="/classroom"
                    className={linkClass}
                  >
                    Class
                  </NavLink>
                  <NavLink
                    to="/teacher"
                    className={linkClass}
                  >
                    Teachers
                  </NavLink>
                  <NavLink
                    to="/subject"
                    className={linkClass}
                  >
                    Subject
                  </NavLink>
                  <NavLink
                    to="/allocate-subject"
                    className={linkClass}
                  >
                    Allocate Subject
                  </NavLink>
                  <NavLink
                    to="/allocate-classroom"
                    className={linkClass}
                  >
                    Allocate Class
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar