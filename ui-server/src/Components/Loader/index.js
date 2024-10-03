// import "./App.css";
import * as React from "react";
import { InfinitySpin } from "react-loader-spinner";
function Loader() {
    

  return (
    <>
      <div className=" flex h-screen w-screen  justify-center items-center transform -rotate-45 -rotate-y-45%">
      <InfinitySpin width="300" color="#FF6005" />
      </div>
    </>
  );
}

export default Loader;