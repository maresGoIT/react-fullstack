import { useState, useEffect, createContext } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import facultiesService from "../../common/service/facultiesService";
import Error from "../../common/components/Error/Error";

export const FacultyContext = createContext();

const FacultyPage = () => {
  const [faculty, setFaculty] = useState({
    id: 0,
    name: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function get() {
      const response = await facultiesService.getItem(id);
      console.dir(response);
      setFaculty(response);

      return response;
    }

    setIsLoading(true);
    get()
      .catch((error) => {
        console.error(error);
        setError("A aparut o eroare la obtinerea listei de orase.");
      })
      .finally(setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Se incarca...</div>;
  }

  if (error && error.length > 0) {
    return <Error message={error}></Error>;
  }

  return (
    <div>
      <h2>{faculty.name}</h2>
      <div className="tabs">
        <NavLink to={`/faculties/${id}/description`}>Description</NavLink>
        <NavLink to={`/faculties/${id}/history`}>History</NavLink>
      </div>
      <FacultyContext.Provider value={faculty}>
        <Outlet />
      </FacultyContext.Provider>
      <Link to="/faculties">Back to faculties list</Link>
    </div>
  );
};

export default FacultyPage;
