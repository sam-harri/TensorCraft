import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="relative w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center">
        <div className="relative border border-gray-200 rounded-3xl backdrop-blur-3xl overflow-hidden h-[34rem] bg-gray-200 grid place-items-center max-w-lg w-full mx-4">
          <div className="space-y-4 z-10 px">
            <div className="mx-12">
              <h1 className="text-5xl">404 - Page Not Found</h1>
              <p className="mt-4 text-lg text-gray-700">The page you are looking for does not exist.</p>
              <div className="mt-6">
                <Link 
                  to="/" 
                  className="inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 left-0 w-80 h-80 bg-pink-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl -z-50 opacity-50 animate-fade-in" />
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
