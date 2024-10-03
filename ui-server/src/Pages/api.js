import axios from 'axios'; // Or your preferred HTTP client
const baseurl=process.env.REACT_APP_BACKEND_URL 


export const fetchEhrHistoryData = async (patient_id) => {
  try {
    const response = await axios.get(`${baseurl}/ehr/get_patient_ehr_history`, {
        params: {
          patient_id: patient_id,
        },
      });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching history data:", error);
    return null;
  }
};

export const fetchEhrdetailsData = async (conversation_id) => {
    try {
      const response = await axios.get(`${baseurl}/ehr/get_patient_ehr_details`, {
          params: {
            conversation_id: conversation_id,
          },
        });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching history data:", error);
      return null;
    }
  };



export const fetchSimilarData = async (patient_id) => {
    try {
      const response = await axios.get(`${baseurl}/cxr/search`, {
          params: {
            patient_id: patient_id,
          },
        });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching history data:", error);
      return null;
    }
};  