import React, { useState } from "react";
import { IoOpenOutline } from "react-icons/io5";
import * as constant from "../constant";
import Navbar from "../Components/Navbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Link, useParams } from "react-router-dom";
// import radiology from "../Images/radiology.png";
import radiology from "../Images/00000103_010.png"
import {fetchSimilarData} from './api'
const SimilarCxr = () => {
  const param = useParams();
  const [all_similar,setAllSimilar]=React.useState();
  // const all_similar = constant.SIMILAR;
  const patient_id = param.patient_id;

  React.useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const fetchedData = await fetchSimilarData(patient_id);

        if (fetchedData && fetchedData.length > 0) {
          setAllSimilar(fetchedData)
        }
      } catch (error) {}
    };

    fetchDataFromAPI();
  }, []);

  const generateCompareUrl = (patient_id) => {
    const currentUrl = window.location.href;
    const newUrl = `${currentUrl}/compare/${patient_id}`;
    return newUrl;
  };
  return (
    <div className="flex flex-col  w-screen h-screen overflow-hidden bg-[#EEEEEE]  ">
      <div className="flex h-[8%] w-screen">
        <Navbar title={"Similar CXR"} />
      </div>
      <div className="flex border-b border-gray-400 w-screen h-[5%] items-center">
        <BreadCrumbs />
      </div>
      <div className="flex h-[85%] w-screen mt-3">
        <div className="flex flex-col w-[40%] h-[100%] ml-5 ">
          <span className="flex w-[90%] font-bold mb-1 ">Uploaded CXR:</span>
          <div className="flex h-[85%] w-[95%] mb-1 items-center justify-center ">
            <img
              src={radiology}
              className="flex h-[100%] w-[100%] object-contain"
            />
          </div>

          <div className="flex h-[5%] w-[90%] ">
            {/* <span className="font-bold text-xs  ">Abnormalities : </span>
            <span className="font-base text-xs break-words"></span> */}
          </div>
        </div>
        <div className="flex flex-cols w-[60%] h-[100%]  items-center justify-center overflow-hidden ">
          <div className="w-[95%] h-[100%]  overflow-y-auto  rounded-lg">
            <span className="font-bold">Similar CXR's :</span>
            {all_similar && all_similar.map((similar, index) => (
              <div className="border border-black rounded-lg mb-2 shadow-md">
                <Link
                  to={generateCompareUrl(similar.patient_id)}
                  className="flex w-[100%] "
                >
                  <div className="flex w-[100%] font-sans-system-ui flex-end text-sm ml-5 mt-1">
                    <span className="">Patient id : </span>
                    <div className=" flex text-sm text-blue-500 hover:underline hover:text-orange-500">
                      <span className="ml-2 ">{similar.patient_id}</span>
                      <IoOpenOutline size={8} className="mt-1 ml-1" />
                    </div>
                  </div>
                </Link>
                <div
                  key={index}
                  className="flex  shadow-md overflow-hidden m-2"
                >
                  <img
                    // src={radiology}
                    src={`data:image/png;base64,${similar.similar}`}
                    alt={`Entity ${index + 1}`}
                    className="flex h-36 w-36 object-contain shadow-md"
                  />
                  <div className="flex  p-1 ml-1 overflow-auto ">
                    <p className=" text-gray-800 break-words rounded-lg shadow-md text-xs  p-1">
                      {similar.gemini}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarCxr;
