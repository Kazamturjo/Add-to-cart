import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({cartData,setCartData}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('cart');
      if (storedData) {
        // Attempt to parse the JSON string if it's not empty
        setCartData(JSON.parse(storedData));
      } else {
        // If the stored data is empty or null, set a default value (e.g., an empty array)
        setCartData([]);
      }
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    
      setCartData([]);
    }
  }, []);

  return (
    <nav className="bg-gray-500 p-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <NavLink to="/" className="text-2xl font-bold">
            #Logo
          </NavLink>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`lg:flex flex-grow items-center ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className="text-white lg:mx-4 my-2 lg:my-0"
                activeClassName="border-b-2 border-white"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="text-white lg:mx-4 my-2 lg:my-0"
                activeClassName="border-b-2 border-white"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item relative">
              <NavLink
                to="/cart"
                className="text-white lg:mx-4 my-2 lg:my-0"
                activeClassName="border-b-2 border-white "
              >
      <span className="absolute rounded-full bg-blue-500 text-white px-2 py-1 mt-2  right-0 transform translate-x-1/2 -translate-y-1/2">
                {cartData.length}</span>
                cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="text-white lg:mx-4 my-2 lg:my-0"
                activeClassName="border-b-2 border-white"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
