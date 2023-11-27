import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.component.jsx";

export const ColorContext = createContext("green");

const SharedLayout = () => {
  const [color] = useState("verde");

  return (
    <ColorContext.Provider value={color}>
      <main className="App">
        <Sidebar />
        <section className="container">
          <Outlet />
        </section>
      </main>
    </ColorContext.Provider>
  );
};

export default SharedLayout;
