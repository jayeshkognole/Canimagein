import React from "react";
import Navbar from "./Navbar";

function About (){
    return(<div class="w-screen h-screen">
    <div className="flex flex-col w-screen h-[8%] mb-[2%]">
          <Navbar/>
    </div>
    <div className=" flex flex-col justify-center w-[100%] h-[87%] text-black">
        <div class="w-[75%] h-[10%] flex text-xl font-bold ml-[25%]">
            <span className="text-[#FD5F07]">Can</span>
            <span className="text-[#4E4B54]">Image</span>
            <span className="text-[#5B9D16]">IN </span><div class="w-1"></div>
            <span class="text-[#4E4B54]"> accelerates the screening of lung cancer at early stage</span>
        </div>
        <div class="flex w-[100%] h-[90%] text-black">
            <div class="h-full w-[55%]">
            <iframe
                // width="500"
                // height="250"
                class="w-[85%] h-[75%] pl-[10%] pt-3"
                src={`https://youtube.com/embed/wMYHZQ6DWj4`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"/>
            </div>
            <div class="h-full w-[45%] pt-[5%] text-[14px]">
                <ul class="list-disc marker:text-[#FD5F07]">
                    <li class="mb-4">Analyses chest X-ray images by generative AI and ML embeddings</li>
                    <li class="mb-4">Streamlines screening with EHR summary and standardized reports</li>
                    <li class="mb-4">Provides a cost-effective platform accessible in resource-limited areas</li>
                    <li class="mb-4">Integrates with healthcare systems to improve workflow efficiency</li>
                    <li class="mb-4">Offers training references for interpretation of chest X-ray images</li>
                </ul>
                <div class="flex gap-4 pt-4">
                    <button class="p-2 rounded-full bg-[#FD5F07] text-white font-bold">Download PPT</button>
                    <button class="p-2 rounded-full bg-[#FD5F07] text-white font-bold">Try Demo</button>
                </div>
            </div>
        </div>
        <div class="bg-[#F3B140] w-[100%] h-[18%] flex justify-center items-center">
                <span class="text-[25px] text-white font-bold">Harnessing Generative AI and Machine Learning for Cancer Screening</span>
        </div>
    </div>
    </div>);}

export default About;
