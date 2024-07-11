import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../state/authStore";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '') {
      toast.error("Email must be entered", { autoClose: 2000, position: "top-center" });
      return;
    }
    const error = await resetPassword(email);
    if (!error) {
      toast.success("Password reset email sent successfully!", { autoClose: 2000, position: "top-center" });
    } else {
      toast.error(error.message);
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
                <img src="tensorcraft.png" alt="TensorCraft" className="w-8 h-auto" />
                <img src="tensorcrafttext.png" alt="TensorCraft" className="w-48 h-auto" />
              </Link>
            </div>
            <div className="mx-12">
              <div>
                <h1 className="text-5xl">Forgot Password?</h1>
              </div>
            </div>
            <div className="mx-12 mt-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">Back to Sign In</Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Reset Password'}
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

export default ForgotPassword;
