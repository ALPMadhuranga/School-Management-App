import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      if (err.status === 401) {
        toast.error("Invalid email or password. Please try again!");
      } else {
      toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          {/* Background Design */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-200 opacity-60"></div>

          {/* Login Card */}
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            {/* Logo & System Name */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="/logo.png"
                alt="System Logo"
                className="h-24 w-24 mb-2"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                School Management System
              </h1>
            </div>

            {/* Login Form */}
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default Login;
