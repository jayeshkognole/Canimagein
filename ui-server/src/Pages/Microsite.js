import * as React from "react";
import { Router, Routes,Route } from "react-router-dom";
import Home from "../Components/Microsite/Home";
import Navbar from "../Components/Microsite/Navbar";



function Microsite(){
    return(<div class="w-screen h-screen">
        
        <div className="flex flex-col w-screen h-[8%] mb-[2%]">
          <Navbar/>
        </div>
        <div class="w-[100%] h-[87%] text-black">
            <Home/>
        </div>
    </div>);
}

// function demo(){
//     return(<>
//     <Router>
//         <Navbar/>
//         <Routes>
//             <Route path="/canimagein" element={<Microsite/>}/>
//             <Route path="/canimagein/about" element={<About/>}/>
//             <Route path="/canimagein/research" element={<Research/>}/>
//             <Route path="/canimagein/team" element={<Team/>}/>
//         </Routes>
//     </Router>
//     </>);

// }

export default Microsite