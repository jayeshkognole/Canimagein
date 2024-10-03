import React, { useState } from "react";
import axios from "axios";
import * as constant from "../constant";
function RadioImage({cxr,heatMap}) {
  console.log("test")
  console.log(cxr)
  const [contrastImage, setContrastImage] = useState(true);
  const [WithoutContrastImage, setWithoutContrastImage] = useState(true);
  const handleChange = () => {
    setWithoutContrastImage(!WithoutContrastImage);
    // postWithoutcontrastImage();
  };

  const handleChange1 = () => {
    setContrastImage(!contrastImage);
    postcontrastImage();
  };

  const postcontrastImage = async () => {
    if (contrastImage == "true") {
      const response = await axios.post(`${constant.IMAGE}`, {});
    }
  };

  const postWithoutcontrastImage = async () => {
    if (WithoutContrastImage == "true") {
      const response = await axios.post(`${constant.IMAGE1}`, {});
    }
  };

  return (
    <div className=" h-[100%] w-[100%] justify-center items-center overflow-hidden">
      <div className=" h-[100%] w-[100%]">
        <div className="flex h-[100%] w-[100%] overflow-hidden">
          <div className="flex-col h-[100%] w-[100%]">
            <div className="  w-[100%] flex h-[70%] mb-4">
              {contrastImage && WithoutContrastImage ? (
                <div className="flex w-[80%] h-[90%]">
                  <img
                    className="flex h-[100%] w-[60%] object-contain object-left"
                    src={"data:image/jpeg;base64," + cxr}
                    alt="WithContrastImage"
                  />
                  <img
                    className="flex h-[100%] w-[60%] object-contain object-left"
                    src={"data:image/jpeg;base64," + heatMap}
                    alt="WithoutContrastImage"
                  />
                </div>
              ) : (
                <>
                  {WithoutContrastImage && (
                    <div className="w-[100%] h-[100%]  flex justify-center items-center ">
                      <div className="flex w-[95%] h-[100%] justify-center">
                        <img
                          className=" h-[100%] object-contain "
                          src={"data:image/jpeg;base64," + cxr}
                          alt="My Image"
                        />
                      </div>
                    </div>
                  )}
                  {contrastImage && (
                    <div className="w-[100%] h-[100%%]  flex justify-center items-center ">
                      <div className="flex w-[95%] h-[100%] justify-center">
                        <img
                          className=" h-[100%] object-contain"
                          src={"data:image/jpeg;base64," + heatMap}
                          alt="My Image"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex w-[50%] h-[30%]">
              <div style={{ position: "relative", "margin-right": "5px" }}>
                <label htmlFor="WithoutContrastImageCheckBox">
                  <img
                    style={{ width: "80px" }}
                    src={"data:image/jpeg;base64," + cxr}
                    alt="Image Without Contrast"
                  />
                  <div className="text-xs ">Bounding box</div>
                </label>
                <input
                  type="checkbox"
                  id="WithoutContrastImageCheckBox"
                  name="WithoutContrastImageCheckBox"
                  checked={WithoutContrastImage}
                  onChange={handleChange}
                  style={{ position: "absolute", top: "10px", left: "10px" }}
                />
              </div>
              <div style={{ position: "relative", "margin-left": "5px" }}>
                <label htmlFor="contrastImageCheckBox">
                  <img
                    style={{ width: "80px" }}
                    src={"data:image/jpeg;base64," + heatMap}
                    alt="Image With Contrast"
                  />
                  <div className="text-xs ">Heatmap</div>
                </label>
                <input
                  type="checkbox"
                  id="contrastImageCheckBox"
                  checked={contrastImage}
                  onChange={handleChange1}
                  name="contrastImageCheckBox"
                  style={{ position: "absolute", top: "10px", left: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioImage;