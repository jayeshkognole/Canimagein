import * as constant from "../constant";
import { BsFiletypeMp3 } from "react-icons/bs";
import { FaMicrophone, FaStop } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BreadCrumbs from "../Components/BreadCrumbs";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const InsertEhr = () => {
  const navigate = useNavigate();
  const param = useParams();
  const patient_id = param.patient_id;
  const conversation_id = param.conversation_id;
  const services = constant.services.filter((item) => item.screen === "EHR")[0]
    .services;
  const ADD_TRANS = process.env.REACT_APP_BACKEND_URL + "/ehr/add_conversation";
  const GET_EHR = process.env.REACT_APP_BACKEND_URL + "/generateEhr";
  const UPDATEEHR =
    process.env.REACT_APP_BACKEND_URL + "/ehr/update_summary_ehr";
  const [screen, setScreen] = useState("record");
  const [transLang, setTransLang] = useState();
  const [trans, setTrans] = useState("");
  const [ehr, setEhr] = useState("");
  const [audioData, setAudioData] = useState("");
  const [recording, setRecording] = useState(false);
  const [loader, setLoader] = useState();
  const audioRef = useRef();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      //e.preventDefault();
      e.preventDefault();
      setTrans(trans + "\n");
    }
  };
  const getEhr = () => {
    const payload = { transcript: trans };
    axios
      .post(GET_EHR, payload)
      .then((response) => {
        setEhr(response.data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleButtonClick = () => {
  //   if (!recording) {
  //     // Start recording
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true })
  //       .then((stream) => {
  //         audioRef.current = new MediaRecorder(stream);
  //         audioRef.current.start();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else {
  //     audioRef.current.stop();
  //     audioRef.current.ondataavailable = (event) => {
  //       const blob = new Blob([event.data], { type: "audio/mpeg-3" });
  //       const reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = () => {
  //         const base64data = reader.result.split(",")[1];
  //         setAudioData(base64data);
  //         const payload = { audioData: base64data };
  //         console.log(payload);
  //         axios
  //           .post(ADD_TRANS, payload)
  //           .then((response) => {
  //             console.log(response.data);
  //             setTrans(response.data["data"]);
  //             setScreen("transcript");
  //             getEhr();
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       };
  //     };
  //   }
  //   setRecording(!recording);
  // };

  const handleButtonClick = () => {
    if (!recording) {
      // Start recording
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioRef.current = new MediaRecorder(stream);
          audioRef.current.start();
        })
        .catch((error) => {
          console.error("Error starting recording:", error);
        });
    } else {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.ondataavailable = (event) => {
          const blob = new Blob([event.data], { type: "audio/mpeg-3" });
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result.split(",")[1];
            setAudioData(base64data);
            setLoader(true)
            const payload = { audioData: base64data, patient_id: patient_id };
            axios
              .post(ADD_TRANS, payload)
              .then((response) => {
                setTrans(response.data.data.transcript_english);
                setEhr(response.data.data.ehr);
                setTransLang(response.data.data.transcript);
                setScreen("transcript");
                // getEhr();
              })
              .catch((error) => {
                console.error("Error sending audio data:", error);
                setScreen("transcript");
                // Optionally, handle the error appropriately, such as displaying an error message to the user.
              });
              setLoader(false)
          };
        };
      } else {
        console.error("MediaRecorder is not initialized.");
        // Optionally display a message to the user indicating that the recorder wasn't ready.
      }
    }
    setRecording(!recording);
  };
  
  const handleHistoryClick = () => {
    setLoader(true)
    const payload = { audioData: "", patient_id: patient_id };
    axios
      .post(ADD_TRANS, payload)
      .then((response) => {
        setTrans(response.data.data.transcript_english);
        setEhr(response.data.data.ehr);
        setTransLang(response.data.data.transcript);
        setScreen("transcript");
        // getEhr();
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error sending audio data:", error);
        setScreen("transcript");
        setLoader(false)
        // Optionally, handle the error appropriately, such as displaying an error message to the user.
      });

  };

  const handleDownloadClick = (e) => {
    return <></>;
  };

  const handleUploadClick = async () => {
    const response = await axios.post(UPDATEEHR, {
      transcript: ehr,
      patient_id: patient_id,
      conversation_id: conversation_id,
    });
    navigate(-1);
    return <></>;
  };

  return (
    <div className="flex flex-col  w-screen h-screen overflow-hidden bg-[#EEEEEE]  ">
            {loader ? <Loader/>:(<>
      <div className="h-[8%] w-screen">
        <Navbar title={"CanImageIN"} />
      </div>

      <div className="flex border-b border-gray-200 w-screen h-[5%] ">
        <BreadCrumbs />
      </div>
      <div className="flex  h-[80%] m-2">
        {screen === "record" ? (
          <>
            <div className="flex w-[100%] h-[100%] items-center justify-center text-sm">
              <div className="flex flex-col">
                <div className="flex items-center justify-center my-4 ">
                  Start Recording
                </div>
                <button
                  className={`bg-${recording ? "red" : "blue"}-500 hover:bg-${
                    recording ? "red" : "blue"
                  }-700  flex items-center justify-center font-bold py-2 px-4 rounded`}
                  onClick={handleButtonClick}
                >
                  {recording ? <FaStop /> : <FaMicrophone />}
                </button>
                <div className="flex items-center justify-center my-2 ">
                  <span className="mt-1">OR</span>
                </div>
                <div className="flex items-center justify-center mb-2 ">
                  <span className="mt-1">Choose from History</span>
                </div>
                <hr className="my-3" />
                <div className="flex items-center justify-center bg-gray-200 border rounded-lg">
                  <button
                    className="flex items-center justify-center px-3 py-2"
                    onClick={handleHistoryClick}
                  >
                    <BsFiletypeMp3 className="flex mr-3" />{" "}
                    <span className="flex">VoiceNote PID12345</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" w-[30%] h-[100%] mr-1">
              <div className="flex mb-3 ml-2 text-sm font-bold text-black ">
                Transcript
              </div>
              <textarea
                autoFocus
                value={trans}
                onChange={(e) => setTrans(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[100%] h-[90%] flex text-black hide-scroll-bar"
                placeholder="Transcription ...."
                style={{ outline: "none", padding: "10px" }}
              />
            </div>
            <div className=" w-[70%] h-[100%] ">
              <div className="flex items-center mb-2 ml-2 text-sm font-bold text-black">
                <span>EHR</span>
                <div className="ml-auto">
                  <button
                    className="bg-[#342E39] border-r-2 border-orange-500 py-1 px-2 hover:bg-[#191c20] text-white text-xs mr-4"
                    onClick={() => {
                      handleUploadClick();
                    }}
                  >
                    Upload
                  </button>
                  <button
                    className="bg-[#342E39] border-r-2 border-orange-500 py-1 px-2 hover:bg-[#191c20] text-white text-xs"
                    onClick={() => {
                      handleDownloadClick();
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>

              <textarea
                autoFocus
                value={ehr}
                onChange={(e) => setEhr(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[100%] h-[90%] text-black hide-scroll-bar "
                placeholder="Generating EMR...."
                style={{ outline: "none", padding: "10px" }}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex h-[5%] mt-1 mx-2 w-[screen]">
        <Footer services={services} />
      </div>
      </>)}
    </div>
  );
};

export default InsertEhr;
