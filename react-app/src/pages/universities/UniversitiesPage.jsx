import React, { useState } from "react";
import Tutors from "./components/Tutors/Tutors.jsx";
import UniversityDetails from "./components/UniversityDetails/UniversityDetails.component.jsx";
import Cities from "./components/Cities/Cities.jsx";
import Faculties from "./components/Faculties/Faculties.jsx";

function UniversitiesPage() {
  const [, setColor] = useState("verde");

  return (
    <>
      <UniversityDetails />
      <label>
        <span>Color</span>
        <input type="text" onChange={(e) => setColor(e.target.value)} />
      </label>
      <Tutors />
      <Cities />
      <Faculties />
    </>
  );
}

export default UniversitiesPage;
