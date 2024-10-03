import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { InfinitySpin } from "react-loader-spinner";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BiCopy } from "react-icons/bi";
import axios from "axios";
import { Bars, DNA, ColorRing } from "react-loader-spinner";
import * as constant from "./model_constant";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { LuCircleDollarSign } from "react-icons/lu";
import { styled } from "@mui/material/styles";
import { GiRobotAntennas } from "react-icons/gi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ClipboardJS from "clipboard";
import * as constants from "../../Comp/constant";
import { MdOutlineAddchart } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { models } from "./constant";
import FormData from "form-data";
import { AiOutlineFileAdd } from "react-icons/ai"
function Chat({
  selected,
  selectedImages,
  selectedwsi,
  patient_id,
  handleUpdateReport,
  chunks,
  handleImageClick,
  handleMultiImageSelect,
}) {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); //constants.CHAT
  const [cost, setCost] = useState(0);
  const [audioRecording, setAudioRecording] = useState("text");
  const [updateReportLoader, setUpdateReportLoader] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  // const [modelSelected,setModelSelected] = useState("Gemini")
  const [selectedOption, setSelectedOption] = React.useState("Gemini-1.5-Flash-001");
  const [checkbox, setCheckbox] = useState(false);
  const [selectedInfo,setSelectedInfo] = useState([""]);

  const [mlcheckbox,setMLcheckbox] = useState(false);
  const [ftcheckbox,setFTcheckbox] = useState(false);
  const [lmmcheckbox,setLMMcheckbox] = useState(false);
  const audioRef = useRef();
  const GET_CHAT = process.env.REACT_APP_BACKEND_URL + "/cxr/get_ai_response";
  // getAudioChat
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const handleChangeCheckbox = (event) => {
    setCheckbox(event.target.checked);
  };
  const handleChangeOptionsCheckbox = (event) =>{
    if(event.target.name == "ml"){
        setMLcheckbox(event.target.checked)
    }
    if(event.target.name == "ft"){
        setFTcheckbox(event.target.checked)
    }
    if(event.target.name == "lmm"){
        setLMMcheckbox(event.target.checked)
    }

  }
  useEffect(()=>{
    setSelectedInfo([])
  },[mlcheckbox,ftcheckbox,lmmcheckbox])
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpdateReportChat = async (message) => {
    handleUpdateReport(message);
  };

  const getCost = () => {
    return (
      <div className="flex text-xs">
        <ul>
          <li>Report cost : 0.0003</li>
          <li>Chat cost : {cost}</li>
          <li>Total cost :{0.0003 + cost}</li>
        </ul>
      </div>
    );
  };
  // const renderoutput = (input) => {
  //   var parts = [];
  //   //console.log(input);
  //   if (input && input.trim() !== "") {
  //     parts = input
  //       .trim()
  //       .replace(/^\s+/, "")
  //       .replace(/\n\s*\n/g, "\n")
  //       .split(/\*\*(?=\S)(.*?\S)\*\*/g);
  //   }
  //   //parts.map(() => {
  //   // console.log("input :" + parts);
  //   //});
  //   return (
  //     <div style={{ whiteSpace: "break-spaces" }}>
  //       {parts.map((item, index) =>
  //         index % 2 === 1 ? (
  //           //<div className="flex bg-[#050509]">Hi {item}</div>
  //           <span className="font-bold ">{item.trim}</span>
  //         ) : (
  //           <div>{item}</div>
  //         )
  //       )}
  //     </div>
  //   );
  // };
  const renderoutput = (input) => {
    var parts = [];
    input = input.replace(/\*\*/g, "");
    //console.log(input);
    if (input && input.trim() !== "") {
      parts = input.split("```");
    }
    //parts.map(() => {
    // console.log("input :" + parts);
    //});
    return (
      <div style={{ whiteSpace: "break-spaces" }}>
        {parts.map((item, index) =>
          index % 2 === 1 ? (
            //<div className="flex bg-[#050509]">Hi {item}</div>
            <div className="bg-white ">
              <div className="flex justify-between items-center mb-4 bg-[#41414f] rounded-t-lg p-2">
                <h3 className="mr-2 text-lg font-bold ">
                  {item.substring(0, item.indexOf("\n")) ? (
                    <div>{item.substring(0, item.indexOf("\n"))}</div>
                  ) : (
                    <div>code snippet</div>
                  )}
                </h3>
                <button
                  className="copy-button"
                  data-clipboard-text={item.substring(
                    item.indexOf("\n"),
                    item.length
                  )}
                  onClick={handleCopy}
                >
                  <BiCopy size={23} />
                </button>
              </div>
              <div className="p-2 ">
                <SyntaxHighlighter
                  language={
                    item.substring(0, item.indexOf("\n"))
                      ? item.substring(0, item.indexOf("\n"))
                      : "jsx"
                  }
                  style={atomDark}
                >
                  {item.substring(item.indexOf("\n"), item.length).trim()}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <div className="">{item}</div>
          )
        )}
      </div>
    );
  };

  const handleSend = async () => {
    if (input.trim) {
      console.log(input);

      setChat([...chat, { role: "user", content: input }]);
      setInput("");
      let apires = "";
      setLoader(true);

      await axios
        .get(
          GET_CHAT, {
        params: {
          prompt: input,
          patient_id: patient_id
        }},
        )
        .then((response) => {
          apires = response;
        });
      setLoader(false);
      setCost(
        cost +
          (input.length / 1000) * 0.00025 +
          (apires.data.data.length / 1000) * 0.0005
      );
      setChat([
        ...chat,
        { role: "user", content: input },
        { role: "assistant", content: apires.data.data, status: false },
      ]);
    }
    console.log(chat)
  };

  const handleCopy = () => {
    const clipboard = new ClipboardJS(".copy-button");
    clipboard.on("success", () => {
      console.log("Copied to clipboard!");
    });
    clipboard.on("error", () => {
      console.log("Failed to copy to clipboard!");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // const c = input.trim() ? handleSend() : undefined;
    } else if (e.key === "Enter" && e.shiftKey) {
      //e.preventDefault();
      e.preventDefault();
      setInput(input + "\n");
    }
  };

  const startRecording = async () => {
    const reader = new FileReader();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        // const audioUrl = URL.createObjectURL(audioBlob);
        // setAudioUrl(audioUrl);
        setAudioFile(audioBlob);

        console.log(audioFile);
        reader.readAsDataURL(audioFile);
        // handleaudfile(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      // setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };
  // const stopRecording = () => {
  //   if(isRecording){
  //   mediaRecorderRef.current.stop();
  //   setIsRecording(false);}
  // };

  const apicall=async(file)=>{
    const formData = new FormData();
    formData.append("chunks", chunks);
    formData.append("models", selectedOption);
    formData.append("file", file);
    await axios
        .post(GET_CHAT,  formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data["data"].chunks_selected.length);
          if (response.data["data"].chunks_selected.length > 2) {
            handleMultiImageSelect(response.data["data"].chunks_selected);
          } else if (response.data["data"].chunks_selected.length > 0) {
            response.data["data"].chunks_selected.forEach((element) =>
              handleImageClick(
                element.indexOf(".jpg") === -1 ? element + ".jpg" : element
              )
            );
          }

          if (response.data["data"].model !== "") {
            setSelectedOption(response.data["data"].model);
          }

          if (
            response.data["data"].history === true ||
            response.data["data"].history === false
          ) {
            setCheckbox(response.data["data"].history);
          }

          if (response.data["status_code"] === 300) {
            alert(response.data["data"]);
          } else if (response.data["status_code"] === 1000) {
            alert(input + response.data["data"].status_message);
            setInput(input + response.data["data"].transcript);
          } else {
            setInput(input + response.data["data"].transcript);
          }
          setAudioRecording("text");
        })
        .catch((error) => {
          axios
            .post(GET_CHAT , formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              console.log(response.data["data"].chunks_selected.length);
              if (response.data["data"].chunks_selected.length > 0) {
                response.data["data"].chunks_selected.forEach((element) =>
                  handleImageClick(
                    element.indexOf(".jpg") === -1 ? element + ".jpg" : element
                  )
                );
              }
              if (response.data["status_code"] === 300) {
                alert(response.data["data"]);
              } else if (response.data["status_code"] === 1000) {
                alert(
                  "Currently Only Gemini is configured so using Gemini for voice processing and Using " +
                    response.data["data"].model +
                    "for generating response"
                );
                setInput(input + response.data["data"].transcript);
              } else {
                setInput(input + response.data["data"].transcript);
              }

              setAudioRecording("text");
            })
            .catch((error) => {
              console.error(error);
              setAudioRecording("text");
            });
        });
  }



  const handleAudioRecording = async () => {
    // const reader = new FileReader();
    let file;
    if (audioRecording === "text") {
      setAudioRecording("record");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioFile(audioBlob)
          apicall(audioBlob);
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    } else {
      // const test;

      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();  
        audioChunksRef.current = [];
      }
      setAudioRecording("process");
      // const formData = new FormData();
      // formData.append("chunks", chunks);
      // formData.append("models", selectedOption);
      // formData.append("file", audioFile);




    // await axios
    // .post(GET_CHAT,  formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    // .then((response) => {
    //   console.log(response.data["data"].chunks_selected.length);
    //   if (response.data["data"].chunks_selected.length > 2) {
    //     handleMultiImageSelect(response.data["data"].chunks_selected);
    //   } else if (response.data["data"].chunks_selected.length > 0) {
    //     response.data["data"].chunks_selected.forEach((element) =>
    //       handleImageClick(
    //         element.indexOf(".jpg") === -1 ? element + ".jpg" : element
    //       )
    //     );
    //   }

    //   if (response.data["data"].model !== "") {
    //     setSelectedOption(response.data["data"].model);
    //   }

    //   if (
    //     response.data["data"].history === true ||
    //     response.data["data"].history === false
    //   ) {
    //     setCheckbox(response.data["data"].history);
    //   }

    //   if (response.data["status_code"] === 300) {
    //     alert(response.data["data"]);
    //   } else if (response.data["status_code"] === 1000) {
    //     alert(input + response.data["data"].status_message);
    //     setInput(input + response.data["data"].transcript);
    //   } else {
    //     setInput(input + response.data["data"].transcript);
    //   }
    //   setAudioRecording("text");
    // })
    // .catch((error) => {
    //   axios
    //     .post(GET_CHAT , formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data["data"].chunks_selected.length);
    //       if (response.data["data"].chunks_selected.length > 0) {
    //         response.data["data"].chunks_selected.forEach((element) =>
    //           handleImageClick(
    //             element.indexOf(".jpg") === -1 ? element + ".jpg" : element
    //           )
    //         );
    //       }
    //       if (response.data["status_code"] === 300) {
    //         alert(response.data["data"]);
    //       } else if (response.data["status_code"] === 1000) {
    //         alert(
    //           "Currently Only Gemini is configured so using Gemini for voice processing and Using " +
    //             response.data["data"].model +
    //             "for generating response"
    //         );
    //         setInput(input + response.data["data"].transcript);
    //       } else {
    //         setInput(input + response.data["data"].transcript);
    //       }

    //       setAudioRecording("text");
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setAudioRecording("text");
    //     });
    // });






      // };
      // };
    }

    // setAudioRecording("text");
  };

  return (
    <>
        {/* <div class="border-l-indigo-400 w-full h-7"></div>
        <div class="border-l-indigo-400 w-full h-7"></div> */}
        {/* <div class=" ml-2 w-full h-[3%] mb-3 flex flex-wrap text-black"> 
            <input name="ml" type="checkbox" className="ml-2 bg-black border-2 border-orange-500 rounded-md focus:ring-orange-500 focus:ring-2" checked={mlcheckbox} onChange={handleChangeOptionsCheckbox}/>
            <label htmlFor="checkbox" className="ml-2 text-xs ">ML</label>
            
            <input name="ft" type="checkbox" className="ml-4 bg-black border-2 border-orange-500 rounded-md focus:ring-orange-500 focus:ring-2" checked={ftcheckbox} onChange={handleChangeOptionsCheckbox}/>
            <label htmlFor="checkbox" className="ml-2 text-xs ">Fine-tuned Paligemma</label>
            
            <input name="lmm" type="checkbox" className="ml-4 bg-black border-2 border-orange-500 rounded-md focus:ring-orange-500 focus:ring-2" checked={lmmcheckbox} onChange={handleChangeOptionsCheckbox}/>
            <label htmlFor="checkbox" className="ml-2 text-xs ">Gemini LMM</label>
        </div> */}
        <div class="ml-2 flex flex-col w-full h-[97%] text-xs text-black">
            <div class="w-[95%] h-6 bg-white shadow-md mb-4 text-orange-500 text-base font-bold text-center">AI Assistant</div>
            <div className="flex flex-col w-full h-[100%]   pr-5 rounded-sm">
            <div className="flex  w-[100%] h-[5%] mb-1">
                <div className="flex  w-[50%]">
                <select
                    className="items-center justify-center text-xs text-black border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    onChange={handleOptionChange}
                    value={selectedOption}
                >
                    {models.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
                </div>

                <div className="flex justify-end items-center  w-[50%]">
                {/* <Checkbox
                        checked={checkbox} // Use the state value for checked
                        onChange={handleChangeCheckbox}
                    // defaultChecked
                    sx={{
                    color: "",
                    "&.Mui-checked": {
                        color: "",
                    },
                    }}
                    size="small"
                /> */}
                {/* Include history */}
                <input
                    type="checkbox"
                    className="bg-black border-2 border-orange-500 rounded-md focus:ring-orange-500 focus:ring-2"
                    checked={checkbox}
                    onChange={handleChangeCheckbox}
                />
                <label htmlFor="checkbox" className="ml-2 text-xs ">
                    Include history
                </label>
                <div className="h-[65%] border-l-2 border-gray-500 mx-3 "></div>
                <LightTooltip placement="top" title={getCost()}>
                    <button>
                    <LuCircleDollarSign size={20} />
                    </button>
                </LightTooltip>
                </div>
            </div>
            {chat.length > 0 ? (
             
                <div
                className={`  h-[80%] overflow-auto hide-scroll-bar pt-3 
                    "bg-[#F8F8F8]"
                }`}
                >
                {chat.map((item, index) => (
                    <div
                    className={` w-[100%] mx-auto p-3 bg-[#F8F8F8]"
                    } flex ${
                        item.role === "assistant"
                        ? "rounded-lg bg-[#a9a9a9]"
                        : ""
                    }`}
                    >
                    <span className="h-full p-2 mr-2 rounded-full ">
                        {item.role === "assistant" ? (
                        <>
                            <GiRobotAntennas size={20} />
                        </>
                        ) : (
                        <FaRegUserCircle size={20} />
                        )}
                    </span>
                    <div
                        className={` leading-loose overflow-x-auto `}
                        style={{ whiteSpace: "break-spaces" }}
                    >
                        {renderoutput(item.content)}
                    </div>
                    {/* {item.role === "assistant" ? (<>
                        <AiOutlineFileAdd/>
                        <div
                        className={` leading-loose overflow-x-auto `}
                        style={{ whiteSpace: "break-spaces" }}
                        >
                        {renderoutput(item.content)}
                        </div></>
                    ) : (
                        <div
                        className={` leading-loose overflow-x-auto `}
                        style={{ whiteSpace: "break-spaces" }}
                        >
                        {renderoutput(item.content)}
                        </div>
                    )}

                    <div
                        className="overflow-x-auto leading-loose "
                        style={{ whiteSpace: "break-spaces" }}
                    >
                        {renderoutput(item.content)}
                    </div> */}
                    <span className="h-full p-1 ml-2 rounded-full ">
                        {item.role === "assistant" ? (
                        <button
                            onClick={async () => {
                            setUpdateReportLoader(true);
                            handleUpdateReportChat(item.content);
                            setUpdateReportLoader(false);
                            item.status = true;
                            }}
                        >
                            {item.status ? (
                            <TiTick size={22} className="text-green-300" />
                            ) : (
                            <MdOutlineAddchart size={20} className="text-[#FB9600]" />
                            )}

                            {/* {updateReportLoader ? (
                            <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                                ]}
                            />
                            ) : (
                            <MdOutlineAddchart size={20} className="text-[#FB9600]" />
                            )} */}
                        </button>
                        ) : (
                        ""
                        )}
                    </span>
                    </div>
                ))}
                </div>
            ) : (
                <div
                class={`flex flex-col h-[90%] overflow-scroll  hide-scroll-bar items-center justify-center pt-3  bg-[#EEEEEE] rounded-lg`}
                ></div>
            )}
            <div className="items-center justify-center f">
                <div className="flex text-xs">
                <span>Select</span> <span className="px-1 text-orange-600"> AI </span>{" "}
                <span> generated queries :</span>
                </div>
                <div className="flex ml-2 flex-cols">
                <button
                    class="flex border-2 border-[#FB9600] rounded-lg m-2 px-1 py-1"
                    onClick={() => {
                    setInput(constant.prompt_pathology[0]);
                    }}
                >
                    <div>
                    {" "}
                    <LightTooltip
                        placement="top"
                        title={constant.prompt_pathology[0]}
                    >
                        <span className="text-xs ">{constant.button_pathlogy[0]}</span>
                    </LightTooltip>
                    </div>
                </button>
                <button
                    class="flex border-2 border-[#FB9600] rounded-lg m-2 px-1 py-1"
                    onClick={() => {
                    setInput(constant.prompt_pathology[1]);
                    }}
                >
                    <div>
                    {" "}
                    <LightTooltip
                        placement="top"
                        title={constant.prompt_pathology[1]}
                    >
                        <span className="text-xs ">{constant.button_pathlogy[1]}</span>
                    </LightTooltip>
                    </div>
                </button>
                <button
                    class="flex border-2 border-[#FB9600] rounded-lg m-2 px-1 py-1"
                    onClick={() => {
                    setInput(constant.prompt_pathology[2]);
                    }}
                >
                    <div>
                    {" "}
                    <LightTooltip
                        placement="top"
                        title={constant.prompt_pathology[2]}
                    >
                        <span className="text-xs ">{constant.button_pathlogy[2]}</span>
                    </LightTooltip>
                    </div>
                </button>
                </div>
            </div>
            <div className=" h-[20%]  ">
                <div className=" flex flex-row items-center justify-center w-full h-[100%] ">
                <div className=" w-[80%] h-[100%] flex  ">
                    {audioRecording === "text" && (
                    <textarea
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-2 bg-[#EEEEEE] w-[100%] text-black text-sm hide-scroll-bar rounded-lg"
                        placeholder="Question ...."
                        style={{ outline: "none" }}
                    />
                    )}
                    {audioRecording === "process" && (
                    <div className="flex w-[100%] h-[100%] items-center justify-center">
                        <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                        />
                    </div>
                    )}
                    {audioRecording === "record" && (
                    <div className="flex w-[100%] h-[100%] items-center justify-center">
                        <Bars
                        height="40"
                        width="80"
                        color="#FB9600"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                    </div>
                    )}
                </div>
                <div className="w-[20%] h-[100%] flex">
                    <div className="flex  h-[100%]  w-[100%] items-center justify-center">
                    {loader ? (
                        <div className="  transform -rotate-45 -rotate-y-45%">
                        <InfinitySpin width="140" color="#FF6005" />
                        </div>
                    ) : (
                        <div className="flex flex-cols items-center justify-center  w-[100%] h-[100%] ">
                        <button
                            className={`cursor-pointer text-black p-1 rounded-lg transition-colors duration-300 ease-in-out ${
                            audioRecording === "text"
                                ? "hover:bg-green-500 hover:text-black"
                                : "bg-red-200"
                            }`}
                            onClick={() => handleAudioRecording()}
                        >
                            {audioRecording === "record" ? (
                            <AiOutlineAudioMuted size={20} />
                            ) : (
                            <AiOutlineAudio size={20} />
                            )}
                        </button>
                        <button
                            className="p-1 text-black rounded-lg cursor-pointer "
                            onClick={() => (input.trim() ? handleSend() : undefined)}
                        >
                            <IoMdSend size={20} />
                        </button>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}

export default Chat;