import React from "react";
import home from "../../Images/home.png";

function Content (){
    return(<>
    <div className=" flex flex-row justify-center w-[100%] h-[100%]">
           <div class="w-[58%] h-[100%] pl-[13%]">
                <span class=" font-bold text-[30px] text-[#4E4B54]">Unlocking the Power of</span><br/>
                <span class=" font-bold text-[30px] text-[#4E4B54]">Generative AI for</span><br/>   
                <span class=" font-bold text-[30px] text-[#5B9D16]">Early Screening of</span><br/>
                <span class=" font-bold text-[30px] text-[#5B9D16]">Lung Cancer with Precision</span><br/>
                <span class="text-[10px] font-semibold text-[#4E4B54]">Pioneering the realm of AIML-powered cancer screening solution with accuracy and pace. Discover the blend of advanced technology and domain expertise, accelerating early-stage lung cancer detection through chest X-ray images. Dedicated to improve patient experience by simplifying screening process, offering audio transcriptions of doctor-patient conversations, and generating standardized reports for healthcare providers.</span><br/>
                {/* <button class="rounded-full bg-[#FD7F39] p-1 pl-2 pr-2 font-semibold text-[10px] text-white mt-4">{`Get Started ->`}</button> */}
           </div>
           <div class="w-[42%] h-[100%]">
                <div class="">
                    <img src={home} class="w-[50%] ml-[25%]"></img>
                </div>
           </div>
    </div>
    
    </>);}

export default Content;
