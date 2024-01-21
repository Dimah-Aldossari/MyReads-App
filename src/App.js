

import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import "./App.css";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>

  );
}

export default App;
