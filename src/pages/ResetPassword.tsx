import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../state/authStore";
import { supabase } from "../supabaseclient"; // Ensure this import points to your Supabase client

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFirstPassword, setFirstShowPassword] = useState(false);
  const [showSecondPassword, setSecondShowPassword] = useState(false);
  const { updatePassword, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("You need to be authenticated to reset your password.", { autoClose: 1000, position: "top-center" });
        navigate('/signin');
      }
    };
    checkSession();
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 2000, position: "top-center" });
      return;
    }

    const error = await updatePassword(password);

    if (error) {
      toast.error("Error resetting password: " + error.message, { autoClose: 2000, position: "top-center" });
    } else {
      toast.success("Password reset successfully", { autoClose: 2000, position: "top-center" });
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="relative w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center">
        <div className="relative border border-gray-200 rounded-3xl backdrop-blur-3xl overflow-hidden h-[34rem] bg-gray-200 grid place-items-center max-w-lg w-full mx-4">
          <div className="space-y-4 z-10 px">
            <div className="container mx-auto flex justify-center items-center mb-6">
              <Link to="/" className="flex items-center">
                <img
                  src="tensorcraft.png"
                  alt="TensorCraft"
                  className="w-8 h-auto"
                />
                <img
                  src="tensorcrafttext.png"
                  alt="TensorCraft"
                  className="w-48 h-auto"
                />
              </Link>
            </div>
            <div className="mx-12">
              <div>
                <h1 className="text-5xl">Reset Password</h1>
              </div>
            </div>
            <div className="mx-12 mt-6">
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showFirstPassword ? "text" : "password"}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setFirstShowPassword(!showFirstPassword)}
                      className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none opacity-50"
                    >
                      {showFirstPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showSecondPassword ? "text" : "password"}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setSecondShowPassword(!showSecondPassword)}
                      className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none opacity-50"
                    >
                      {showSecondPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="absolute -bottom-16 left-0 w-80 h-80 bg-pink-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
