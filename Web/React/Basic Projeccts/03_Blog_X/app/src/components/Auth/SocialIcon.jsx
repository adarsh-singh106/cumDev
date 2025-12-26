import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ icon }) => (
  <Link
    to="#"
    className="border border-gray-600 rounded-full inline-flex justify-center items-center cursor-pointer w-10 h-10 hover:bg-gray-800 transition-colors text-white"
  >
    <span className="font-bold text-sm">{icon}</span>
  </Link>
);

export default SocialIcon;
