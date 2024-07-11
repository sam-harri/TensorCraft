import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmEmail: React.FC = () => {
  const { resendConfirmationEmail, loading } = useAuthStore();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';

  const handleResend = async () => {
    const error = await resendConfirmationEmail(email);
    if (!error) {
      toast.success("Confirmation email resent successfully!", { autoClose: 2000, position: "top-center" });
    } else {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="relative w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center">
        <div className="relative border border-gray-200 rounded-3xl backdrop-blur-3xl overflow-hidden h-[30rem] bg-gray-200 grid place-items-center max-w-lg w-full mx-4">
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
                <h1 className="text-5xl">Confirm Your Email</h1>
              </div>
            </div>
            <div className="mx-12 mt-6">
              <div className="space-y-4 text-center">
                <p className="text-lg">
                  We've sent a confirmation link to your email address. Please check your email and follow the instructions to confirm your account.
                </p>
                <p className="text-sm">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={handleResend}
                    className="text-indigo-600 hover:text-indigo-500"
                    disabled={loading}
                  >
                    {loading ? 'Resending...' : 'click here to resend'}
                  </button>.
                </p>
                <div>
                  <Link
                    to="/signin"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute -bottom-16 left-0 w-80 h-80 bg-pink-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in"
          />
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
