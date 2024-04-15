import React from "react";
import myPhoto from "../images/myphoto.jpeg";
import react_icon from "../assets/react.svg";

const DefaultCard = () => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* Flex container for side-by-side layout */}
      <div className="flex justify-end">
        <button
          // Assuming onDelete is a function passed to handle the delete action
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          aria-label="Delete message">
          Delete
        </button>
      </div>
      <div className="flex">
        {/* Fixed size image on the left */}
        <img
          src={react_icon} // Replace with your image path
          alt="avatar"
          className="w-24 h-24 mr-4 object-cover" // Fixed width and height with margin-right
        />
        {/* Text content on the right */}
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <p className="mt-4 font-normal text-gray-600 dark:text-gray-400 text-left">
            Author: John Doe
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;
