import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  
  // State for managing mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-white text-black rounded-md px-3 py-2'
      : 'text-white hover:bg-white hover:text-black rounded-md px-3 py-2';

  return (
    <nav className="bg-blue-600 border-b border-blue-400 fixed top-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            {/* Logo */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-12 w-auto" src={logo} alt="School Management App" />
            </NavLink>
            <div className="hidden md:block">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Student Record
                </NavLink>
                <NavLink to="/student" className={linkClass}>
                  Student
                </NavLink>
                <NavLink to="/teacher" className={linkClass}>
                  Teachers
                </NavLink>
                <NavLink to="/classroom" className={linkClass}>
                  Class
                </NavLink>
                <NavLink to="/subject" className={linkClass}>
                  Subject
                </NavLink>
                <NavLink to="/allocate-subject" className={linkClass}>
                  Allocate Subject
                </NavLink>
                <NavLink to="/allocate-classroom" className={linkClass}>
                  Allocate Class
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <UserDropdown logoutHandler={logoutHandler} userName={userInfo?.name || 'Guest'} />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Hamburger icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="flex flex-col space-y-2 px-4 py-2">
            <NavLink to="/" className={linkClass}>
              Student Record
            </NavLink>
            <NavLink to="/student" className={linkClass}>
              Student
            </NavLink>
            <NavLink to="/teacher" className={linkClass}>
              Teachers
            </NavLink>
            <NavLink to="/classroom" className={linkClass}>
              Class
            </NavLink>
            <NavLink to="/subject" className={linkClass}>
              Subject
            </NavLink>
            <NavLink to="/allocate-subject" className={linkClass}>
              Allocate Subject
            </NavLink>
            <NavLink to="/allocate-classroom" className={linkClass}>
              Allocate Class
            </NavLink>
            <button onClick={logoutHandler} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;