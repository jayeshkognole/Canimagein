import React, { useState } from "react";
import * as constant from "../constant";
import Navbar from "../Components/Navbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import { Link, useParams } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Footer from "../Components/Footer";
import { fetchEhrHistoryData , fetchEhrdetailsData } from "./api";

const PatientEhr = () => {
  const param = useParams();
  const patient_id = param.patient_id;
  const services = constant.services.filter((item) => item.screen === "EHR")[0]
    .services;
  const [history, setHistory] = useState(); //constant.history
  const [selectedHistory, setSelectedHistory] = useState(); //history[0]
  const [data, setData] = useState([]); //[]constant.data1
  const [tableRow, selectedTableRow] = useState();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableSummary, setTableSummary] = useState();
  const [ehrPrediction, setEhrPrediction] = useState();
  const [similarEhr,setSimilarEhr]= useState();
  const [tableHeader, setTableHeader] = useState([]);//...new Set(data.map((item) => item['table'])),
  const [selectedButton, setSelectedButton] = useState(tableHeader[0]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [summaryCoversation,setSummaryCoversation]=useState();
  const [tableSummaryEnglish,setTableSummaryEnglish]=useState();

  React.useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const fetchedData = await fetchEhrHistoryData(patient_id);

        if (fetchedData && fetchedData.length > 0) {
          setHistory(fetchedData);
          setSummaryCoversation(fetchedData.find(item => item.title === "Summary")?.conversation_id)
          setSelectedHistory(fetchedData[0]['title']);
          const fetcheddetailData = await fetchEhrdetailsData(fetchedData[0]['conversation_id']);
          setData(fetcheddetailData);
          console.log(fetcheddetailData)
          setTableHeader(fetcheddetailData.map(item => item.table))
          setSelectedButton(fetcheddetailData.map(item => item.table)[0])
          console.log(fetcheddetailData.find(item => item.table === "EHR"))
          setTableSummary(fetcheddetailData.find(item => item.table === "EHR").summary);
          setTableSummaryEnglish(fetcheddetailData.find(item => item.table === "EHR").summary_english);
          setSimilarEhr(fetcheddetailData.find(item => item.table === "EHR").similar_ehr)
          setEhrPrediction(fetcheddetailData.find(item => item.table === "Patient").ehr_prediction)
        }
      } catch (error) {}
    };

    fetchDataFromAPI();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  React.useEffect(() => {
    if (data && data.length > 0) {
    const table =  data.find((t) => t.table === selectedButton);

    if (table) {
      selectedTableRow(table.rows);
      setTableColumns(table.columns);

    } else {
      selectedTableRow(null);
      setTableColumns(null);
      console.warn(`Table "${selectedButton}" not found.`);
    }
  }
  }, [selectedButton]);

  const handleHistoryClick = async (conversation_id) => {
    setSelectedHistory(conversation_id['title']);
    const fetchedData = await fetchEhrdetailsData(conversation_id['conversation_id']);
    setData(fetchedData);
    setTableHeader(fetchedData.map(item => item.table))
    setSelectedButton(fetchedData.map(item => item.table)[0])
    console.log("test")
    console.log(fetchedData.map(item => item.table))
    setTableSummary(fetchedData.find(item => item.table === "EHR").summary);
    setSimilarEhr(fetchedData.find(item => item.table === "EHR").similar_ehr);
    // setEhrPrediction(fetchedData.find(item => item.table === "patient").ehr_prediction)
  };

  const generateCompareUrl = () => {
    const currentUrl = window.location.href;
    const newUrl = `${currentUrl}/InsertEhr/${summaryCoversation}`;
    return newUrl;
  };

  return (
    <div className="flex flex-col  w-screen h-screen overflow-hidden bg-[#EEEEEE]  items-center">
      <div className="h-[8%] w-screen">
        <Navbar title={"EHR Console"} />
      </div>
      <div className="flex border-b border-gray-200 w-screen h-[5%] items-center ">
        <BreadCrumbs />
      </div>
      <div className="flex w-[98%] h-[81%] overflow-hidden flex-col">
        <div className="flex h-[5%] w-[100%] mb-2 mt-5 justify-between">
          <Link
            to={generateCompareUrl()}
            className="relative inline-flex items-center px-6 py-3 text-xs text-white font-medium leading-6  bg-[#342E39] hover:bg-[#191c20]"
          >
            Add Conversation
            <span className="absolute top-0 right-0 h-full w-0.5 bg-orange-500 " />
          </Link>
          <div className="flex ">

            <button className="relative inline-flex items-center px-6 py-3 text-white font-medium text-xs bg-[#342E39] hover:bg-[#191c20]">
              Download
              <span className="absolute top-0 right-0 h-full w-0.5 bg-orange-500 " />
            </button>
          </div>
        </div>
        <div className="flex  h-[95%] w-full">
          <div className="flex  items-center flex-col w-[20%] h-[100%]  mr-2">
            <div className="flex flex-col w-[100%] bg-white h-[80%] mb-2">
            <div className="flex  items-center text-sm mb-2  font-bold">
              Conversation History
            </div>

            {history &&
              history.map((item, index) => (
                <button
                  key={index}
                  className={` justify-between border-r-2 border-orange-500 ml-3 w-[90%] mb-1 inline-flex items-center  px-3 py-1  font-medium text-xs bg-[#342E39] hover:bg-[#191c20]${
                    selectedHistory === item['title']
                      ? " text-orange-500 border-x-2"
                      : " text-white"
                  }`}
                  onClick={() => handleHistoryClick(item)}
                >
                  {item['title']}
                  <Link to="/ehr" className="">
                    <CiPlay1 />
                  </Link>
                </button>
              ))}
              </div>
              <div className={`flex flex-col w-[100%]  h-[20%] justify-center items-center inline-block ${ehrPrediction=="high"?"bg-red-300":''} ${ehrPrediction=="medium"?"bg-yellow-300":''} ${ehrPrediction=="low"?"bg-green-300":''} `}>

                <span className="font-bold">EHR risk predictor</span><span className="">{ehrPrediction}</span>
              </div>
          </div>
      

          <div className="flex flex-col w-[80%] h-[100%] ">
            <div className="flex items-center h-[5%] mb-1">
              <span className="">Data :</span>
              {tableHeader &&
                tableHeader.map((tableName, index) => (
                  <button
                    key={tableName}
                    className={`flex bg-[#342E39] border-b-2 border-orange-500 py-1 px-2  hover:bg-[#191c20]  ml-2 text-xs ${
                      selectedButton === tableName
                        ? " text-orange-500 border-y-2"
                        : " text-white"
                    }`}
                    onClick={() => handleClick(tableName)}
                  >
                    {tableName}
                  </button>
                ))}
            </div>
            <div className="flex h-[40%] border border-black overflow-auto">
              <table className="w-full text-xs border-collapse border border-gray-300 m-3">
                <thead>
                  <tr className="bg-gray-100">
                    {tableColumns &&
                      tableColumns.map((column) => (
                        <th key={column} className="border border-gray-300 p-2">
                          {column}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRow &&
                    tableRow.map((row) => (
                      <tr key={row.id} className="border border-gray-300">
                        {tableColumns.map((column) => (
                          <td
                            key={`${row.id}-${column}`}
                            className="border border-gray-300 p-2"
                          >
                            {row[column]}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className=" h-[5%] mt-1 ">
              <div
                className="flex items-center inline-block h-[90%] cursor-pointer  justify-end "
                onClick={handleToggle}
              >
                <span
                  className={`text-xs  mr-2 ${
                    isEnabled
                      ? "font-thin "
                      : "text-orange-500 font-bold underline"
                  }`}
                >
                  Summary
                </span>
                <div
                  className={` ${
                    isEnabled ? "flex bg-orange-200" : "bg-gray-500"
                  } border border-black rounded-full h-[72%] w-[3%]`}
                >
                  <div
                    className={` flex  w-[70%] h-[100%] rounded-full transition-transform duration-200 ${
                      isEnabled
                        ? "bg-orange-500 translate-x-2"
                        : "bg-white translate-x-0"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs  ml-2 ${
                    isEnabled
                      ? "text-orange-500 font-bold underline"
                      : "font-thin mr-2 "
                  }`}
                >
                  English Summary
                </span>
              </div>
            </div>
            {isEnabled ? (
              <>
                <div className="flex h-[50%] border border-black mt-1 overflow-auto "><span className="">{tableSummaryEnglish}</span></div>
              </>
            ) : (
              <>
                <div className="flex h-[50%] border border-black mt-1 overflow-auto ">
                  <span className="">{tableSummary}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-[5%] mt-1 mx-2 w-[100%]">
        <Footer services={services} />
      </div>
    </div>
  );
};

export default PatientEhr;
