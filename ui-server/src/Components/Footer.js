import React from "react";
import persi_logo from "../Images/gcp.png"
function Footer ({services}){
    return(<>
    <div className="bg-[#342E39] flex  items-center mt-1  w-[100%] h-[100%]">
        <div className="flex font-serif text-xs text-orange-500">
            @copyright Persistent systems
        </div>
           <div className="flex items-center ml-auto h-[100%]">
           <img src={persi_logo} className="flex  h-[50%] object-contain"/>
           <span className="  mr-2 flex font-bold  font-serif text-xs text-white ml-1"> - {services}</span>
           </div>
    </div>
    
    </>);}

export default Footer;
