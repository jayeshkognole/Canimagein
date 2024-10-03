import React from "react";
import persi_logo from "../Images/persi_logo_1.png"
function Navbar ({title}){
    return(<>
    <div className="bg-[#342E39] flex items-center w-[100%] h-[100%]">
           <img src={persi_logo} className="flex ml-5 h-[60%] object-contain"/> 
           <span className="flex font-bold  text-white ml-5">{title}</span>
    </div>
    
    </>);}

export default Navbar;
