import React, { useState } from "react";
import Tutors from "../components/Tutors/Tutors.jsx";
import University from "../components/University/University.component.jsx";
import Cities from "../components/Cities/Cities.jsx";
import Faculties from "../components/Faculties/Faculties.jsx";

function HomePage() {
  const [, setColor] = useState("verde");

  return (
    <>
      <University />
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

export default HomePage;
