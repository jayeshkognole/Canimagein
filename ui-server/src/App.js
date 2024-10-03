import "./App.css";
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import Radiology from "./Pages/Radiology";
// import Microsite from "./Pages/Microsite";
// import About from "./Components/Microsite/About";
// import Research from "./Components/Microsite/Research";
// import Team from "./Components/Microsite/Team";
const Team = React.lazy(() => import("./Components/Microsite/Team"));
const Research = React.lazy(() => import("./Components/Microsite/Research"));
const About = React.lazy(() => import("./Components/Microsite/About"));
const Radiology = React.lazy(() => import("./Pages/Radiology"));
const Microsite = React.lazy(() => import("./Pages/Microsite"));
const Landing2 = React.lazy(() => import("./Pages/Landing2"));
const Landing = React.lazy(() => import("./Pages/Landing"));
const SimilarCxr = React.lazy(() => import("./Pages/SimilarCxr"));
const InsertEhr = React.lazy(() => import("./Pages/InsertEhr"));
const PatientEhr = React.lazy(() => import("./Pages/PatientEhr"));
function App() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [backendStatus, setBackendStatus] = React.useState('Checking...');
  const defaultPatientId = 'DM001-2024-045'; // Your static patient ID
  React.useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(`/${defaultPatientId}`);
    }
  }, [navigate]);


  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(URL+"/ehr/health"); 
        if (response.ok) {
          setBackendStatus('Backend is healthy');
        } else {
          alert("Backend Down")
          setBackendStatus('Backend is not responding');
        }
      } catch (error) {
        setBackendStatus('Backend is not responding');
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
        <Routes>
        <Route path="/" element={<Navigate to={`/${defaultPatientId}`} />} />
          <Route path="/:patient_id" element={<Landing2 />} />
          {/* <Route path="/:patient_id/1" element={<Landing />} /> */}
          <Route path="/EHR" element={<><div className="flex w-screen h-screen bg-red-200"></div></>} />
          {/* <Route path="/:patient_id/Radiology" element={<><div className="flex w-screen h-screen"></div></>} /> */}
          <Route path="/:patient_id/Radiology/similar" element={<SimilarCxr/>} />
          <Route path="/:patient_id/Ehr" element={<PatientEhr/>} />
          <Route path="/:patient_id/Ehr/InsertEhr/:conversation_id" element={<InsertEhr/>} />
          <Route path="/:patient_id/Radiology" element={<Radiology/>} />
          {/* <Route path="/Radiology" element={<Radiology1/>} /> */}
          
          <Route path="/canimagein" element={<Microsite/>}/>
          <Route path="/canimagein/about" element={<About/>}/>
          <Route path="/canimagein/research" element={<Research/>}/>
          <Route path="/canimagein/team" element={<Team/>}/>
          </Routes>
    </>
  );
}

export default App;
