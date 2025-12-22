import React from "react";
import { Link } from "react-router-dom"; // 1. Imported Link

const Header = () => {
  const isLoggedIn = false; // 2. Defined the condition variable (example)

  return (
    <div className="flex justify-between items-center p-4"> {/* Added basic layout */}
      <Link to="/">
        <img src="/blog.png" alt="Blog Logo" className="w-12" />
      </Link>
      
      <div>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link> {/* 3. Added 'to' props */}
          </li>
          <li>
            <Link to="/blog">My Blog</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div>
        {/* Used the defined variable */}
        <button>{isLoggedIn ? "Sign Up" : "Login"}</button>
      </div>
    </div>
  );
};

export default Header;