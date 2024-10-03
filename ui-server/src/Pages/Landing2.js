import React from "react";
import Navbar from "../Components/Navbar";
import team from "../Images/team.png"
import patho from "../Images/embedding_pathologist.png"
import radiology from "../Images/pathology_console.png"
import { useLocation, Link, useParams } from 'react-router-dom';
import Footer from "../Components/Footer";


function Landing2 (){
    const currentUrl = window.location.href;
    return(<div class=" flex flex-col  overflow-hidden w-screen h-screen">
    <div className="flex flex-col w-screen h-[8%]">
         <Navbar title={"CanImageIN"} />
    </div>
    <div className=" flex flex-col justify-center w-[100%] h-[87%] text-black bg-[#EEEEEE] pt-[2%]">
        {/* <div class="w-[75%] h-[10%] flex text-xl  ml-[13%]">
            Team
        </div> */}
        <div class="flex w-[100%] h-[90%] text-black">
            <div class="h-full w-[70%]">
            <div className="flex flex-col w-[80%] h-[20%] ml-[10%] text-3xl text-green-600 ">
                    <div className="">GenAI-powered Radiology Co-Pilot for</div>
                    <div className=""> Lung Cancer Screening with Chest X-Rays</div>
                    </div>
                <div class="flex flex-wrap ml-[100px] mt-[15%]">
                    
                    <div class="w-[370px] h-[105px] m-2 bg-white flex p-1 rounded-lg">
                        <img src={patho} class="rounded-full w-[30%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2 ml-3">
                            <span class="font-bold mb-4 mt-3 ml-2">EHR Console</span>
                            <Link
                                to={`${currentUrl}/${"EHR"}`}
                                className="px-4 py-0 font-bold text-white transition duration-300 ease-in-out transform bg-orange-500 rounded-full w-fit hover:bg-orange-600 hover:scale-105 hover:shadow-md "
                                >
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div class="w-[370px] h-[105px] m-2 bg-white flex p-1 rounded-lg">
                        <img src={radiology} class="rounded-full w-[50%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2 ml-3">
                            <span class="font-bold mb-4 mt-3 ml-2">Radiology Console</span>
                            <Link
                                to={`${currentUrl}/${"Radiology"}`}
                                className="px-4 py-0 font-bold text-white transition duration-300 ease-in-out transform bg-orange-500 rounded-full w-fit hover:bg-orange-600 hover:scale-105 hover:shadow-md"
                                >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-full w-[30%]  text-[14px] flex items-center justify-center">
                <img src={team} class="w-[80%]"></img>
            </div>
        </div>
        {/* <div class="bg-[#033440] w-[100%] h-[18%] flex  items-center gap-[55%]">
            <span class="ml-[5%] text-[10px] text-white ">Copyright CanImageIN. All rights reserved. | Designed by <span class="text-[#FD5F07]">Persistent Systems Ltd.</span></span>
            <img src={canimagein} class="w-[75px] rounded-full"></img>
        </div> */}
    </div>
    <div className="flex flex-col w-screen h-[5%]">
        <Footer services={""}/>
    </div>
    </div>);}

export default Landing2;
