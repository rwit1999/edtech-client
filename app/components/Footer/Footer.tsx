import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Wiser</h2>
            <p className="text-gray-400 mb-4">
              Learning that gets you skills for your present and future. Get started with us.
            </p>
            <p className="text-gray-400">
              Contact us: <a href="mailto:info@example.com" className="underline">info@example.com</a>
            </p>
          </div>
          {/* Column 2 */}
          <div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Services</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQ</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
            </div>
          </div>
          {/* Column 3 */}
          <div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Accessibility</a>
            </div>
          </div>
          {/* Column 4 */}
          <div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15v3m0 0a3 3 0 01-6 0v-3m6 3v-3m0 0a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 my-4" />
        <div className="text-center text-gray-400">
          &copy; 2024 Wiser. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
