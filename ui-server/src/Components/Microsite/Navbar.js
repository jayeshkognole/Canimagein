import React from "react";
import persi_logo from "../../Images/persi_logo.png"
function Navbar ({title}){
    return(<>
    <div className=" flex flex-row justify-center w-[100%] h-[100%]">
           <div class="w-fit h-full flex items-center text-xl font-bold">
               <span className="text-[#FD5F07]">Can</span>
               <span className="text-[#4E4B54]">Image</span>
               <span className="text-[#5B9D16]">IN</span>
           </div>
           <div class="w-fit ml-[40%] text-[#4E4B54] text-sm font-bold">
                <ul class="flex">
                    <a href="/canimagein"><li class="p-2 selection:text-orange-500">Home</li></a>
                    <a href="/canimagein/about"><li class="p-2 ml-7">About</li></a>
                    <a href="/canimagein/research"><li class="p-2 ml-7">Research</li></a>
                    <a href="/canimagein/team"><li class="p-2 ml-7">Team</li></a>
                </ul>
            </div>
    </div>
    
    </>);}

export default Navbar;
