import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./pages/HomePage";
import FacultiesPage from "./pages/FacultiesPage";
import NotFoundPage from "./pages/NotFoundPage";
import FacultyPage from "./pages/FacultyPage";
import FacultyHistory from "./components/Faculties/FacultyHistory";
import FacultyDescription from "./components/Faculties/FacultyDescription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="faculties" element={<FacultiesPage />} />
          <Route path="faculties/:id" element={<FacultyPage />}>
            <Route index element={<FacultyDescription />} />
            <Route path="description" element={<FacultyDescription />} />
            <Route path="history" element={<FacultyHistory />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
