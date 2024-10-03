import React, { useState } from "react";
import axios from "axios";
import RadioImage from "../Comp/RadioImage";
import * as constant from "../Components/Radiology/constant";
import * as constant1 from "../Comp/constant";
import Chat from "../Components/Radiology/Chatbot";
import PopupReport from "../Components/PopUpReport/index";
import { Link, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import PieChart1 from "../Comp/PieChart";
import detection from "../Images/detection.svg";
import analysis from "../Images/analysis.svg";
import summary from "../Images/report.svg";
import { ArcherContainer, ArcherElement } from "react-archer";
import Navbar from "../Components/Navbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import Footer from "../Components/Footer";
import * as consta from "../constant";
function Land() {
  const services = consta.services.filter(
    (item) => item.screen === "Radiology"
  )[0].services;
  const param = useParams();
  const patient_id = param.patient_id;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedwsi, setSelectedWsi] = React.useState(); //constant.IMAGE
  const [selectedwsitiles, setSelectedWsitiles] = React.useState([]); //constant.IMAGE
  const [selectedTile, setSelectedTile] = React.useState("");
  const [piechartVisible, setPiechartVisible] = React.useState(true);

  const [selectedImages, setSelectedImages] = React.useState([]);
  const [loaderActive, setLoaderActive] = React.useState(false);
  const employee_id = constant.employee_id;
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [selectedButton, setSelectedButton] = React.useState(2);
  const [selectedDetailsButton, setSelectedDetailsButton] = React.useState(1);
  const [draftPopUP, setDraftPopUP] = useState(false);
  const [draftReport, setDraftReport] = React.useState(
    constant.RADIOLOGY_REPORT
  );
  document.title = "Radiology Module";
  const GETMODELOUTPUT =
    process.env.REACT_APP_BACKEND_URL + "/cxr/get_model_output";
  const UPDATE_RADIOLOGY_REPORT = URL + "/updateReport";
  const [compareBtn, setCompareBtn] = React.useState(false);
  const [mlOutput, setMlOutput] = React.useState({});
  const [geminiOutput, setGeminiOutput] = React.useState("");
  const [finetunedModel, setFinetunedModel] = React.useState();
  const [cxr, setCxr] = React.useState();
  React.useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(GETMODELOUTPUT, {
          params: {
            patient_id: patient_id,
            // image_name: imageName,
          },
        });
        console.log(response.data.data);
        setGeminiOutput(response.data.data.gemini_output);
        setFinetunedModel(response.data.data.paligemma_output);
        setMlOutput(response.data.data.ml_output);
        setCxr(response.data.data.image_name);
        console.log(geminiOutput);
      } catch (err) {
        // setError(err);
        console.error("API call failed:", err); // Log the error for debugging
      }
    };
    fetchApiData();
  }, []);

  const handleTileChange = (event) => {
    setSelectedTile(event.target.value);
  };
  const handleViewPieChartChange = () => {
    setPiechartVisible((prevValue) => !prevValue);
  };
  const handleImageClick = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  const handleUpdateReport = async (conversation) => {
    const payload = { conversation: conversation, report: draftReport };
    await axios
      .post(UPDATE_RADIOLOGY_REPORT, payload)
      .then((response) => {
        setDraftReport(response.data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const HandleRemovePopUp = () => {
    setDraftPopUP(false);
  };
  const handleSetDraftReport = (report) => {
    setDraftReport(report);
  };
  const handleDownload = () => {
    const pdfFile = require("../Comp/Draft_Radiology_12345.pdf");
    saveAs(pdfFile, "Draft_Radiology_12345.pdf");
  };
  // const changeCompareDiv = () =>{
  //   const d
  // }

  const steps = [
    {
      label: "Detection",
      activeColor: "bg-rose-500",
      deActiveColor: "bg-rose-700",
      arrowColor: "from-rose-500 to-rose-700",
      image: detection,
      tolabel: "Analysis",
      color: "#BE123C",
    },
    {
      label: "Analysis",
      activeColor: "bg-teal-500",
      deActiveColor: "bg-teal-700",
      arrowColor: "from-teal-500 to-teal-700",
      image: analysis,
      tolabel: "Summary",
      color: "teal",
    },
    {
      label: "Summary",
      activeColor: "bg-[#F5AE45]",
      deActiveColor: "bg-amber-700",
      arrowColor: "from-amber-500 to-amber-700",
      image: summary,
      tolabel: "",
      color: "#B45309",
    },
  ];

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  React.useLayoutEffect(() => {}, [activeStep]);

  const generateCompareUrl = () => {
    const currentUrl = window.location.href;
    const newUrl = `${currentUrl}/similar`;
    return newUrl;
  };

  const stepsToDisplay = steps;

  const [selectedFeature, setSelectedFeature] = React.useState("Detection");

  return (
    <ArcherContainer lineStyle="angle">
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#EEEEEE]">
        <div className="flex flex-col w-[screen] h-[5%] mb-1">
          <Navbar title={"Radiology"} />
        </div>
        <div className="flex flex-col w-[screen] h-[4%] mb-1">
          <BreadCrumbs />
        </div>

        <div className="flex overflow-hidden w-[100%] h-[87%] mb-1">
          <div class="flex flex-col w-[23%] h-[100%] mr-2 ">
            <div className="flex-col w-[100%] h-[46%] ml-2 bg-white">
              <div className="flex flex-col ml-[10%] mb-[10]  w-[100%] justify-end text-white">
                {stepsToDisplay.map((step, index) => (
                  <div
                    key={index}
                    className={`flex w-[80%] items-center rounded-lg my-3 ${
                      index <= activeStep + 1 ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      index <= activeStep + 1 && handleStepClick(index);
                      setSelectedFeature(step.label);
                    }}
                  >
                    <ArcherElement
                      id={step.label}
                      relations={[
                        {
                          targetId: index < activeStep ? step.tolabel : "",
                          targetAnchor: "top",
                          sourceAnchor: "bottom",
                          style: { strokeColor: step.color, strokeWidth: 1.5 },
                        },
                      ]}
                    >
                      <span
                        className={`text-xs px-2.5 py-1.5 transition duration-300 ease-in-out transform text-center rounded-lg w-[70%] ${
                          activeStep === index
                            ? step.activeColor +
                              " hover:scale-105 hover:shadow-md"
                            : index <= activeStep + 1
                            ? step.deActiveColor +
                              " hover:scale-105 hover:shadow-md"
                            : "bg-[#5D5861]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </ArcherElement>

                    {index === activeStep ? (
                      <>
                        <div
                          className={`h-0.5 w-10 transition-opacity duration-5000 ease-in-out ${step.activeColor}`}
                        />
                        <img
                          alt="image"
                          src={step.image}
                          className="w-[12%] object-contain transition-opacity duration-500000 ease-in-out"
                        />
                      </>
                    ) : index <= activeStep ? (
                      <>
                        <div className="h-0.5 w-10 opacity-0" />
                        <img
                          src={step.image}
                          className="w-[12%] object-contain transition-opacity duration-500000 ease-in-out"
                        />
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div class="bg-white w-[100%] h-[54%] mt-1 ml-2">
              <div className="h-[100%] w-[100%]">
                <h3 class="text-orange-600 text-center font-bold shadow-md w-[90%] ml-[5%]">
                  Patient Details
                </h3>
                <PieChart1
                  piechartVisible={piechartVisible}
                  selectedwsi={selectedwsi}
                  selected={selected}
                />
              </div>
            </div>
          </div>
          <div className=" flex w-[50%] h-[100%] bg-[#EEEEEE] ">
            {selectedFeature == "Detection" ? (
              <div className={` flex w-[100%] h-[100%]  mt-4 ml-5  text-black`}>
                <RadioImage cxr={mlOutput.cxr} heatMap={mlOutput.heat_map} />
              </div>
            ) : selectedFeature == "Analysis" ? (
              <div
                className={` w-[100%] h-[100%] ml-1 flex flex-col gap-1 items-center text-white `}
              >
                <div class="w-[100%] h-[65%] flex flex-col items-center">
                  <div class="h-[100%] w-[100%] flex  justify-center ">
                    <img
                      className="h-[100%]  "
                      src={"data:image/jpeg;base64," + cxr}
                      alt="WithContrastImage"
                    />
                  </div>
                </div>
                <div class=" w-[100%] h-[35%] flex flex-col">
                  <label class="items-end ml-auto mr-5 mb-1 cursor-pointer w-[40%] flex gap-1">
                    <span class="text-[10px] font-medium text-black">
                      Base Paligemma
                    </span>
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked={compareBtn}
                      onClick={(e) => {
                        setCompareBtn(e.target.checked);
                      }}
                    />
                    <div
                      class={`relative w-9 h-5 peer-focus:outline-none   rounded-md peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-md after:h-4 after:w-4 after:transition-all  peer-checked:bg-orange-400 after:bg-[#EEEEEE]`}
                    ></div>
                    <span class="text-[10px] font-medium text-orange-500">
                      Finetuned Paligemma
                    </span>
                  </label>
                  {compareBtn ? (
                    <div class="w-[100%] h-[85%] flex gap-1 justify-center text-black">
                      <div class="bg-white w-[48%]">
                        <div className="">
                          <div className="flex h-20% justify-center items-center border-b-2 border-gray-400 shadow-md pb-2 ">
                            Base Paligemma model
                          </div>
                          <div className="flex px-2 text-sm pt-4 items-center justify-center ">
                            {finetunedModel.base}
                          </div>
                        </div>
                      </div>
                      <div class="bg-white w-[48%]">
                        {" "}
                        <div className="">
                          <div className="flex h-20% justify-center  items-center border-b-2 border-gray-400 shadow-md pb-2 ">
                            Finetuned Paligemma model
                          </div>
                          <div className="flex px-2 pt-4 items-center text-sm justify-center ">
                            {finetunedModel.finetuned}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="w-[80%] h-[85%] bg-white ml-[10%] text-black">
                                             <div className="">
                          <div className="flex h-20% justify-center items-center border-b-2 border-gray-400 shadow-md pb-2 ">Base Paligemma model</div>
                        <div className="flex px-2 pt-4 items-center justify-center ">{finetunedModel.base}</div>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={` w-[100%] h-[100%] ml-1 flex flex-col gap-1 items-center text-white `}
              >
                <div class="w-full h-[50%] flex flex-col items-center mb-2">
                  <div class="h-[100%] flex ">
                    <img
                      className="h-[100%] "
                      src={"data:image/jpeg;base64," + cxr}
                      alt="WithContrastImage"
                    />
                  </div>
                </div>
                <div class=" w-[100%] h-[50%] flex flex-col">
                  <div class="w-[80%] h-[100%] bg-white ml-[10%] text-black  px-2">
                    <span className="text-sm "> {geminiOutput}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="w-[27%] h-[100%] flex flex-col">
            <div className="flex w-[100%] h-[5%] justify-center mb-2  items-center ">
              <Link
                to={generateCompareUrl()}
                className="text-[10px] items-center justify-center ml-2 w-full  inline-flex flex bg-[#4D4D4D] border-r-2 border-orange-500 shadow-md text-white hover:bg-[#FFFFFF] hover:text-[#4D4D4D]  px-2 py-1"
              >
                Similar CXR
              </Link>
              {draftPopUP && (
                <PopupReport
                  openPopUp={draftPopUP}
                  employee_id={employee_id}
                  closePopUp={HandleRemovePopUp}
                  domain={"Radiology"}
                  report={draftReport}
                  handleSetDraftReport={handleSetDraftReport}
                />
              )}
              <button
                className={
                  "text-[10px] mx-1 items-center justify-center w-full white-space-nowrap flex bg-[#4D4D4D] border-r-2 border-orange-500  shadow-md text-white hover:bg-[#FFFFFF] hover:text-[#4D4D4D]  px-2 py-1"
                }
                onClick={() => setDraftPopUP(true)}
              >
                Draft Report
              </button>
              <button
                className={
                  "text-[10px] mr-2 items-center justify-center w-full white-space-nowrap flex bg-[#4D4D4D] border-r-2 border-orange-500  shadow-md text-white hover:bg-[#FFFFFF] hover:text-[#4D4D4D]  px-2 py-1"
                }
                onClick={() => handleDownload()}
              >
                {/* <svg
                  class="h-4 w-4 text-white mr-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />{" "}
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />{" "}
                  <line x1="12" y1="11" x2="12" y2="17" />{" "}
                  <polyline points="9 14 12 17 15 14" />
                </svg> */}
                Standard Report 
              </button>
            </div>
            <div className="pl-2 bg-white w-full h-[95%] text-black">
              <Chat
                patient_id={patient_id}
                selected={selected}
                selectedImages={selectedImages}
                selectedButton={selectedButton}
                handleUpdateReport={handleUpdateReport}
              />
            </div>
          </div>
        </div>
        <div className="flex w-screen h-[4%]">
          <Footer services={services} />
        </div>
      </div>
    </ArcherContainer>
  );
}

export default Land;
