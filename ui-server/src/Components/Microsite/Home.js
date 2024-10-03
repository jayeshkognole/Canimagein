import React from "react";
import gcp from "../../Images/gcp_logo.png"
import psl from "../../Images/psl_logo.png"
import Content from "./Content";

function Home (){
    return(<>
    <div className=" flex flex-col justify-center w-[100%] h-[100%]">
        <div class="w-[100%] h-[64%]">
            <Content/>
        </div>
        <div class="bg-[#0085F7] w-[100%] h-[18%] flex justify-center items-center">
            <span class="text-[25px] text-white font-bold">Transforming the Future of Cancer Management with Artificial Intelligence</span>
        </div>
        <div class="flex flex-col items-center w-[100%] h-[18%]">
            <span class="text-[#76747A] text-[10px] font-bold">Supported by</span>
            <div class="w-full h-fit flex gap-[15%] items-center justify-center">
                <img src={gcp} class="h-[50%]"></img>
                <img src={psl} class="h-[50%]"></img>
            </div>
        </div>
    </div>
    
    </>);}

export default Home;
