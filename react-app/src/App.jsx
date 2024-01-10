import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";
import UniversitiesPage from "./pages/universities/UniversitiesPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";
import ProtectedRoute from "./pages/common/router/ProtectedRoute";

// Importurile cu lazy (dinamice), trebuie sa fie dupa cele normale

const FacultiesPage = lazy(() => import("./pages/faculties/FacultiesPage"));
const FacultyPage = lazy(() => import("./pages/faculties/faculty/FacultyPage"));
const FacultyDescription = lazy(() =>
  import("./pages/faculties/faculty/components/FacultyDescription")
);
const FacultyHistory = lazy(() =>
  import("./pages/faculties/faculty/components/FacultyHistory")
);

const LoginPage = lazy(() => import("./pages/login/LoginPage"));

// import FacultiesPage from "./pages/faculties/FacultiesPage";
// import FacultyPage from "./pages/faculties/faculty/FacultyPage";
// import FacultyDescription from "./pages/faculties/faculty/components/FacultyDescription";
// import FacultyHistory from "./pages/faculties/faculty/components/FacultyHistory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route index element={<UniversitiesPage />}></Route>
          <Route
            path="faculties"
            element={
              <ProtectedRoute>
                <FacultiesPage />
              </ProtectedRoute>
            }
          />
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
