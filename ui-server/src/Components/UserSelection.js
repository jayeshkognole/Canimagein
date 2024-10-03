import React from "react";
import user from "../Images/user.png";
import embedding_pathologist from "../Images/embedding_pathologist.png";
import pathology_console from "../Images/pathology_console.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const UserSelection = ({ selectedDemo, title }) => {
  return (
    <div className="relative flex justify-center h-full">
      {selectedDemo === title[0].title && (
      <MdOutlineArrowBackIos className="absolute top-20 right-40"/>
    )}
     {selectedDemo === title[1].title && (
      <MdOutlineArrowForwardIos className="absolute top-20 left-40"/>
   )}
  <div className="flex items-center justify-center h-20 w-20 rounded-full border-4 border-gray-300 relative top-[20%] m-2">
    <img
      src={user}
      className="object-contain border-4 border-gray-300 rounded-full"
    />
  </div>
  <div
    className={`absolute top-[20%] left-0 h-24 mb-2 mr-2 w-24 rounded-full border-4 border-red-300 ${
      selectedDemo === title[0].title ? "" : "hidden"
    }`}
    style={{ clipPath: "circle(50% at 0% 45%)" }}
  >
    
  </div>
  <img
    src={embedding_pathologist}
    className={`absolute right-48 top-10 ${
      selectedDemo === title[0].title ? "" : "hidden"
    }`}
  />
  <div
    className={`absolute top-[20%] left-0 h-24 mb-2 mr-2 w-24 rounded-full border-4 border-orange-300 ${
      selectedDemo === title[1].title ? "" : "hidden"
    }`}
    style={{ clipPath: "circle(50% at 90% 45%)" }}
  >
  </div>
  <img
    src={pathology_console}
    className={`absolute left-52 top-14 ${
      selectedDemo === title[1].title ? "" : "hidden"
    }`}
  />
</div>
  );
};

export default UserSelection;