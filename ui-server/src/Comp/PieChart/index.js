import * as React from "react";
import PopupReport1 from "../PopUpReport/index";
import PopUpPatientDetials from "../PopupPatientDetails/index";
import { employee_id } from "../constant";
import { FaPen } from "react-icons/fa";

function PieChart1({
  piechartVisible,
  selectedwsi,
  selected,
}) {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [openPopupPatientDetails, setOpenPopupPatientDetails] =
    React.useState(false);
  const [patientDetails, setPatientDetails] = React.useState({
    id: "PID12345",
    dob: "1988-06-15",
    gender: "Male",
    collectedDate: "2023-12-18",
    clinicalHistory: "Former smoker for 15 year",
    symptoms: "Dyspnea | Coughing |Chest pain | Injury | Fever",
    otherDescription: "",
  });

  const [details, setDetails] = React.useState({
    Recommended_technique:
      "A low dose helical CT CHEST on a Siemens definition AS multi-detector scanner",
    dose: "CT dose index of 3 mGy for standard-sized patient",
    CTDIvol: "2.5 mg(miligrays)",
    DLP: "80 mG cm (miligrays-centimeters)",
  });
  // const [report,setReport]=React.useState(constant.REPORT)
  const HandleRemovePopUp = () => {
    setOpenPopup(false);
  };
  const handleChange = (event) => {
    setPatientDetails({
      ...patientDetails,
      [event.target.name]: event.target.value,
    });
  };
  const HandleRemovePopUpPatientDetails = () => {
    setOpenPopupPatientDetails(false);
  };
  const handleViewClickPatientDetails = () => {
    setOpenPopupPatientDetails(true);
  };


  return (
    <div className="w-[100%] h-[100%] font-semibold text-[10px]">
      {openPopup && (
        <PopupReport1
          openPopUp={openPopup}
          employee_id={employee_id}
          closePopUp={HandleRemovePopUp}
        />
      )}
      {openPopupPatientDetails && (
        <PopUpPatientDetials
          openPopupPatientDetails={openPopupPatientDetails}
          patientDetails={patientDetails}
          handleChange={handleChange}
          HandleRemovePopUpPatientDetails={HandleRemovePopUpPatientDetails}
        />
      )}
      {piechartVisible && (
        <div className={` w-[100%] h-full  overflow-hidden font-semibold text-[10px]`}>
          <div className="flex h-[100%] w-[100%] px-2 py-1 overflow-hidden ">
            <div className={` flex h-[100%] w-[93%] relative rounded-lg mx-4 my-1 text-black`}>
              <table className="table-auto w-[100%] ">
                <tbody>
                  {/* <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Name:
                    </td>
                    <td className={`${backgroundColour==='Light'?'text-black':'text-white'} px-4 text-left w-[60%]`}>
                      {patientDetails.name}
                    </td>
                  </tr> */}
                  <tr>
                    <td className="text-gray-500  px-4 text-left w-[40%]">
                      Patient ID:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.id}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      DOB:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.dob}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Gender:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.gender}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Collected Date:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.collectedDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Clinical History
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.clinicalHistory}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Symptoms:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.symptoms}
                    </td>
                  </tr>
                  <tr className="h-[30%]">
                    <td className="text-gray-500 px-4 text-left w-[40%]">
                      Other Description:
                    </td>
                    <td className={` px-4 text-left w-[60%]`}>
                      {patientDetails.otherDescription}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="absolute top-0 right-0 m-1 ">
                <button
                  className="p-2  rounded-lg hover:bg-gray-200"
                  onClick={() => handleViewClickPatientDetails()}
                >
                  <FaPen size={14}  />
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex h-[48%] w-[100%] px-2 text-white mt-2">
            <div className={` rounded-lg flex h-[100%] w-[93%] mx-4  text-black `}>
              <table className="table-auto w-[100%] ">
                <tbody>
                  <tr>
                    <td className="text-gray-500 px-2 text-left  w-[40%]">
                      Recommended technique:
                    </td>
                    <td className={` px-2 text-left w-[60%]`}>
                      {details.Recommended_technique}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-2 text-left  w-[40%]">
                      Dose:
                    </td>
                    <td className={` px-2 text-left w-[60%]`}>
                      {details.dose}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-2 text-left  w-[60%]">
                      CTDIvol (CT dose Index-Volume):
                    </td>
                    <td className={` px-2 text-left w-[40%]`}>
                      {details.CTDIvol}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 px-4 text-left align-text-top w-[60%]">
                    DLP (Dose Length Product):
                    </td>
                    <td className="text-black px-4 text-left w-[40%]">
                      {details.DLP}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default PieChart1;