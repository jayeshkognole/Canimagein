import React from "react";


const PopUpPatientDetials = ({
  openPopupPatientDetails,
  patientDetails,
  handleChange,
  HandleRemovePopUpPatientDetails,
}) => {
  if (openPopupPatientDetails !== true) return null;

  function handleLosePopUp(e) {
    if (e.target.id === "ModelContainer") {
      HandleRemovePopUpPatientDetails();
    }
  }

  return (
    <div
      id="ModelContainer"
      onClick={handleLosePopUp}
      className="fixed inset-0 bg-white flex justify-center items-center bg-opacity-20 backdrop-blur-sm "
      style={{ backdropFilter: "blur(8px) ", zIndex: 9999 }}
    >
      <div className="p-2 bg-white text-black w-[50%] shadow-inner border-e-emerald-600 text-xs rounded-lg py-5 flex items-center justify-center h-[60%]">
        <div>
          <div className="flex h-[30%] w-[100%] justify-center ">
            <div class="flex justify-center text-xl font-bold text-[#231E28] h-[30%] ">
              <span>Patient Details</span>
            </div>
          </div>
          <div class="border-b-2 w-[100%] border-gray-300 my-6"></div>
          <div className="flex h-[70%] w-[100%] ">
            <table class="table-auto h-[70%]">
              <tbody>
                <tr>
                  <td class="px-2 font-bold">Name</td>
                  <td class="px-2 ">
                    <input
                      type="text"
                      name="name"
                      value={patientDetails.name}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">ID</td>
                  <td class="px-2">
                    <input
                      type="text"
                      name="id"
                      value={patientDetails.id}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">DOB</td>
                  <td class="px-2">
                    <input
                      type="date"
                      name="dob"
                      value={patientDetails.dob}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">Gender</td>
                  <td class="px-2 ">
                    <select
                      name="gender"
                      value={patientDetails.gender}
                      onChange={handleChange}
                      class="border rounded-lg border-gray-300 px-2 "
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">Collected Date</td>
                  <td class="px-2">
                    <input
                      type="date"
                      name="collectedDate"
                      value={patientDetails.collectedDate}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">Clinical History</td>
                  <td class="px-2">
                    <input
                      type="text"
                      name="clinicalHistory"
                      value={patientDetails.clinicalHistory}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 min-w-[100%] min-h-[10%] rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">Symptoms</td>
                  <td class="px-2">
                    <input
                      type="text"
                      name="symptoms"
                      value={patientDetails.symptoms}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 min-w-[100%] min-h-[10%] rounded-lg"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 font-bold">Other Description</td>
                  <td class="px-2">
                    <input
                      type="text"
                      name="otherDescription"
                      value={patientDetails.otherDescription}
                      onChange={handleChange}
                      class="border border-gray-300 p-2 rounded-lg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpPatientDetials;