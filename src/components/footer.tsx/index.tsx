import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className=" bg-indigo-950 py-12">
      <div className="container mx-auto px-4 flex justify-between items-start">
        {/* Left Section */}
        <div>
          <img src="/logo.png" alt="Logo" className="h-8 mb-4" />
          <p className="text-gray-500 text-sm">
            Copyright © 2025 UIT. <br /> All rights reserved
          </p>
          <div className="flex space-x-4 mt-4">
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex space-x-16">
            <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="text-gray-500">
                <li className="mb-1"><a href="#" className="hover:text-gray-700">About us</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-700">Blog</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-700">Contact us</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-700">Pricing</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-700">Testimonials</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="text-gray-500">
                    <li className="mb-1"><a href="#" className="hover:text-gray-700">Help center</a></li>
                    <li className="mb-1"><a href="#" className="hover:text-gray-700">Terms of service</a></li>
                    <li className="mb-1"><a href="#" className="hover:text-gray-700">Legal</a></li>
                    <li className="mb-1"><a href="#" className="hover:text-gray-700">Privacy policy</a></li>
                    <li className="mb-1"><a href="#" className="hover:text-gray-700">Status</a></li>
                </ul>
            </div>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold mb-3">Stay up to date</h4>
          <div className="flex">
              <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-800"
              />
              <button className="bg-primary text-white px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                <img src="/images/arrow.svg" alt="arrow" className="w-4 h-4" />
              </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;