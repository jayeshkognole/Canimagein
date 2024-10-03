import React from "react";
import Navbar from "./Navbar";
import research from "../../Images/research.png"

function About (){
    return(<div class="w-screen h-screen">
    <div className="flex flex-col w-screen h-[8%] mb-[2%]">
          <Navbar/>
    </div>
    <div className=" flex flex-col justify-center w-[100%] h-[87%] text-black">
        <div class="flex w-[100%] h-[90%] text-[#4E4B54]">
        <div class="h-full w-[55%]">
        <table class="table-auto border-[#E9E9EA] border-2 border-collapse ml-[20%]">
            <thead>
                <tr >
                <th class="p-1 border-2 border-collapse border-[#E9E9EA]">LOGO</th>
                <th class="w-[90%] h-[50%] p-1 border-2 border-collapse border-[#E9E9EA]">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr >
                <td class="p-1 border-2 border-collapse border-[#E9E9EA]">Logo1 </td>
                <td class="p-1 border-2 border-collapse border-[#E9E9EA]">desc1</td>
                </tr>
                <tr >
                <td class="p-1 border-2 border-collapse border-[#E9E9EA]">Logo2</td>
                <td class="p-1 border-2 border-collapse border-[#E9E9EA]">desc2 </td>
                </tr>
            </tbody>
        </table>
        </div>
        <div class="h-full w-[45%] pt-[5%] text-[14px]">
            <img src={research} class="w-[70%] ml-[20%]"></img>
        </div>
        </div>
        <div class="bg-[#5B9D16] w-[100%] h-[18%] flex justify-center items-center">
                <span class="text-[25px] text-white font-bold">Training and Finetuning the AI Models with the Data from Authentic Sources</span>
        </div>
    </div>
    </div>);}

export default About;
