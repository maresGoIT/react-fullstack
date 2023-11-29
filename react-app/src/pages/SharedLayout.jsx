import React, { Suspense, createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./common/components/Sidebar/Sidebar.component.jsx";
import Loading from "./common/components/Loading/Loading.jsx";

export const ColorContext = createContext("green");

const SharedLayout = () => {
  const [color] = useState("verde");

  return (
    <ColorContext.Provider value={color}>
      <main className="App">
        <Sidebar />
        <section className="container">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </ColorContext.Provider>
  );
};

export default SharedLayout;
