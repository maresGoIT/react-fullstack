import React, { useContext } from "react";
import { FacultyContext } from "../FacultyPage";

const FacultyHistory = () => {
  const faculty = useContext(FacultyContext);
  const text = faculty?.history || "No history";

  return (
    <div className="text-container">
      <p>{text}</p>
    </div>
  );
};

export default FacultyHistory;
