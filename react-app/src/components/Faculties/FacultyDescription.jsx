import React, { useContext } from "react";
import { FacultyContext } from "../../pages/FacultyPage";

const FacultyDescription = () => {
  const faculty = useContext(FacultyContext);
  const text = faculty?.description || "No description";

  return (
    <div className="text-container">
      <p>{text}</p>
    </div>
  );
};

export default FacultyDescription;
