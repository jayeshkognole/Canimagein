import React from "react";
import Navbar from "./Navbar";
import team from "../../Images/team.png"
import neha from "../../Images/Neha.jpg"
import akash from "../../Images/Akash.png"
import jayesh from "../../Images/Jayesh.jfif"
import akansha from "../../Images/Akansha.jpg"
import canimagein from "../../Images/CanImageIN_logo.svg"


function Team (){
    return(<div class="w-screen h-screen">
    <div className="flex flex-col w-screen h-[8%] mb-[2%]">
          <Navbar/>
    </div>
    <div className=" flex flex-col justify-center w-[100%] h-[87%] text-black bg-[#EEEEEE]">
        <div class="w-[75%] h-[10%] flex text-xl  ml-[13%]">
            Team
        </div>
        <div class="flex w-[100%] h-[90%] text-black">
            <div class="h-full w-[70%]">
                <div class="flex flex-wrap ml-[150px]">
                    <div class="w-[320px] h-[105px] m-2 bg-white flex p-1">
                        <img src={neha} class="rounded-full w-[30%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2">
                            <span class="font-bold">Neha Pandey</span>
                            <span>Senior Manager</span>
                            <span>Offerings and Solutions</span>
                            <span>Corporate CTO Organization BU</span>
                        </div>
                    </div>
                    <div class="w-[320px] h-[105px] m-2 bg-white flex p-1">
                        <img src={akansha} class="rounded-full w-[30%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2">
                            <span class="font-bold">Akansha Wasalu</span>
                            <span>Senior Software Engineer</span>
                            <span>Corporate CTO Organization BU</span>
                        </div>
                    </div>
                    <div class="w-[320px] h-[105px] m-2 bg-white flex p-1">
                        <img src={jayesh} class="rounded-full w-[28%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2">
                            <span class="font-bold">Jayesh Kognole</span>
                            <span>Senior Software Engineer</span>
                            <span>Corporate CTO Organization BU</span>
                        </div>
                    </div>
                    <div class="w-[320px] h-[105px] m-2 bg-white flex p-1">
                        <img src={akash} class="rounded-full w-[30%] pl-1 pt-1"></img>
                        <div class="flex flex-col text-sm pl-2">
                            <span class="font-bold">Akash Saggam</span>
                            <span>Senior Manager</span>
                            <span>Offerings and Solutions</span>
                            <span>Corporate CTO Organization BU</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-full w-[30%]  text-[14px] flex items-center justify-center">
                <img src={team} class="w-[80%]"></img>
            </div>
        </div>
        <div class="bg-[#033440] w-[100%] h-[18%] flex  items-center gap-[55%]">
            <span class="ml-[5%] text-[10px] text-white ">Copyright CanImageIN. All rights reserved. | Designed by <span class="text-[#FD5F07]">Persistent Systems Ltd.</span></span>
            <img src={canimagein} class="w-[75px] rounded-full"></img>
        </div>
    </div>
    </div>);}

export default Team;
