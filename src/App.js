import "./App.css";
import React from "react";
import "./index.css";
import DataGuardTabs from "./components/DataGuardTabs";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
      <div className="App">
        <Routes>
          <Route path="/Marketing" element={<DataGuardTabs activeTabValue="0" />} />
          <Route path="/Finance" element={<DataGuardTabs activeTabValue="1" />} />
          <Route path="/Personnel" element={<DataGuardTabs activeTabValue="2" />} />
          <Route path="*" element={<Navigate to="/Marketing" />} />
        </Routes>
      </div>
    
  );
};

export default App;
