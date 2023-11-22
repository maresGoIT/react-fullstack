import React, { createContext, useState } from "react";
import Tutors from "./components/Tutors/Tutors.jsx";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.component.jsx";
import University from "./components/University/University.component.jsx";
import Cities from "./components/Cities/Cities.jsx";
import Faculties from "./components/Faculties/Faculties.jsx";
// import Test from './components/Test.jsx';

export const ColorContext = createContext("green");

const App = () => {
  const [color, setColor] = useState("verde");

  return (
    <ColorContext.Provider value={color}>
      <main className="App">
        <Sidebar />
        <section className="container">
          <University />
          <label>
            <span>Color</span>
            <input type="text" onChange={(e) => setColor(e.target.value)} />
          </label>
          <Tutors />
          <Cities />
          <Faculties />
        </section>
      </main>
    </ColorContext.Provider>
  );

  // return <Test />;
};

export default App;
