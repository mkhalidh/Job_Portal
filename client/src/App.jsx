  import React, { useContext } from "react";
  import { Route, Routes } from "react-router-dom";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import ApplyJob from "./pages/ApplyJob";
  import Home from "./pages/Home";
  import Application from "./pages/Application";
  import RecruiterLogin from "./components/RecruiterLogin";
  import { AppContext } from "./context/AppContext";
  import Dashboard from "./pages/Dashboard";

  import ManageJobs from "./pages/ManageJobs";
  import ViewApplications from "./pages/ViewApplications";
  import AddJobs from "./pages/AddJobs";

  function App() {
    const { showRecruiterLogin } = useContext(AppContext);

    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        {showRecruiterLogin && <RecruiterLogin />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* these are nested routes , (should import outlet in Dashboard component) */}
            <Route path="add-job" element={<AddJobs />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        
        </Routes>
      </>
    );
  }

  export default App;
