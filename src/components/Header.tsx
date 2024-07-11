import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../state/authStore';  // Adjust the import according to your project structure
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    const error = await signOut();
    if (!error) {
      toast.success("Signed out successfully!",  { autoClose: 1000, position: "top-right" });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error(error.message);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-1/3 mt-4 px-4 py-3 bg-white/30 backdrop-blur-md rounded-lg shadow-md flex items-center justify-between z-50">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="tensorcraft2.png" alt="TensorCraft Logo" className="h-10 mb-0" />
          </Link>
        </div>
        <div className="lg:flex items-center space-x-4">
          {user ? (
            <div className="relative group py-2">
              <div className="flex items-center cursor-pointer">
                <img src='/user.png' alt="User" className="h-7" />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>
              <div className="invisible absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 px-4 text-gray-800 group-hover:visible">
                <Link to="/myaccount" className="block my-2 py-2 font-semibold text-gray-500 hover:text-black">Account</Link>
                <button onClick={handleSignOut} className="block w-full text-left my-2 py-2 font-semibold text-gray-500 hover:text-black">Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-center">Sign In</Link>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
