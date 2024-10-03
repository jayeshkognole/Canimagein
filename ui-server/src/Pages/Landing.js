import React, { useState } from "react";
import background from "../Images/background_dna.png";
import { useLocation, Link, useParams } from 'react-router-dom';
import UserSelection from "../Components/UserSelection";
import LandingHeaderButtons from "../Components/LandingHeaderButtons";
import * as constant from "../constant";
import Navbar from "../Components/Navbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import Footer from "../Components/Footer";

const Landing = () => {
  const services = constant.services.filter((item) => item.screen === "Landing")[0]
  .services;
  const param = useParams();
  const patient_id = param.patient_id;
  const title = constant.TITLE;
  const [selectedDemo, setSelectedDemo] = useState(title[0].title);

  const handleSetSelectedDemo = (demo) => {
    setSelectedDemo(demo);
  };

  const currentUrl = window.location.href;


  return (
    <div className="flex flex-col  w-screen h-screen overflow-hidden bg-[#EEEEEE]  ">
      <div className="h-[8%] w-screen">
        <Navbar title={"CanImageIN"} />
      </div>
      <img
        src={background}
        className="absolute right-10 top-10 object-contain w-[40%]"
      />
      <img
        src={background}
        className="absolute left-10 top-10 object-contain w-[40%] scale-x-[-1]"
      />
      <div className="flex border-b border-gray-200 w-screen h-[7%] ">
        <BreadCrumbs />
      </div>
      <div className="flex  justify-center  w-[100%] h-[20%]">
        <UserSelection selectedDemo={selectedDemo} title={title} />
      </div>
      <div className="flex w-[100%] h-[10%]  items-center justify-center mb-5">
        <div className="flex w-[30%] h-[100%] items-center justify-center  mr-4">
          <LandingHeaderButtons
            selectedDemo={selectedDemo}
            title={title[0].title}
            handleSetSelectedDemo={handleSetSelectedDemo}
          />
        </div>
        <div className="flex w-[30%] h-[100%] items-center justify-center   ml-4">
          <LandingHeaderButtons
            selectedDemo={selectedDemo}
            title={title[1].title}
            handleSetSelectedDemo={handleSetSelectedDemo}
          />
        </div>
      </div>

      <div className="flex w-[100%] h-[50%]  items-center  justify-center mt-3 z-10">
        <div className="flex flex-col w-[30%] h-[80%] flex  mr-4 border bg-[#EEEEEE] border-2 border-orange-400 rounded shadow-md">
          <div className="h-[80%] flex overflow-hidden">
            <span className="ml-6 text-xs transition duration-300 ease-in-out transform ">
              {title
                .find((demo) => demo.title === selectedDemo)
                ?.description.map((desc, index) => (
                  <span className="flex items-center  mt-2">
                    <span className="p-1 w-1 h-1 rounded-full text-[#342E39] bg-orange-600 mr-2"></span>
                    {desc}
                  </span>
                ))}
            </span>
          </div>
          <div className=" flex items-center justify-center">
            {/* <button
              className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-0 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
              onClick={() => {
                window.open(
                  // title.find((demo) => demo.title === selectedDemo)?.url,
                  // "_blank"
                  (window.location.href = title.find(
                    (demo) => demo.title === selectedDemo
                  )?.url)
                );
              }}
            > */}
            <Link
              to={`${currentUrl}/${
                title.find((demo) => demo.title === selectedDemo)?.url
              }`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-0 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md "
            >
              Get Started
            </Link>
            {/* </button> */}
          </div>
        </div>
      </div>
      <div className="h-[5%] w-screen flex ">
      <Footer services={services}/>
      </div>
    </div>
  );
};

export default Landing;
