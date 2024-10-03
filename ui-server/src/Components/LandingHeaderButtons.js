import React from "react";

const LandingHeaderButtons = ({
  title,
  selectedDemo,
  handleSetSelectedDemo,
}) => {
  return (
    <button
      className={`flex h-[50%] w-[50%] justify-center px-6 bg-orange-700 hover:bg-orange-400 text-white font-bold rounded-full shadow-md border border-gray-300 transform transition duration-500 ease-in-out hover:scale-110 ${
        selectedDemo === title ? "scale-110 bg-orange-400" : ""
      }`}
      onClick={() => handleSetSelectedDemo(title)}
    >
      <span className="truncate">{title}</span>
    </button>
  );
};

export default LandingHeaderButtons;