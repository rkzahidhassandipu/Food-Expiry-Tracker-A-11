import React from 'react';
import Loading from '../../Components/Loading/Loading';
import Logo from '../../Components/NavItems/Logo/Logo';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
           <Link to={`/`}>
            <Logo />
           </Link>
          </div>
          <p className="text-sm text-gray-400">
            Helping you reduce food waste and manage your kitchen inventory efficiently.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Useful Links</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a className='hover:text-green-600' href="#">My Fridge</a></li>
            <li><a className='hover:text-green-600' href="#">Add New Food</a></li>
            <li><a className='hover:text-green-600' href="#">My Items List</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-300">123 FoodSaver Lane, Kitchen City, KC 12345</p>
          <p className="text-sm text-gray-300">Email: support@foodexpiry.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2025 FoodExpiry. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
