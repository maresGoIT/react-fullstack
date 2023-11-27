import React, { useEffect, useState } from "react";
import styles from "./FacultiesPage.module.css";
import facultiesService from "../service/facultiesService";
import Error from "../components/common/Error/Error";
import { Link } from "react-router-dom";

const FacultiesPage = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Async folosit la nivelul functiei mari pentru useEffect duce la efecte nedorite,
    // de aceea cream o functie separata in interiorul functiei de la useEffect
    async function getCities() {
      const response = await facultiesService.get();
      setList(response);

      return response;
    }

    // Aici e logica de executie a functie de useEffect
    setIsLoading(true);
    getCities()
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
      <h2>Faculties List</h2>
      <div className={styles.list}>
        {list.map((item) => (
          <div className={`box ${styles.listItem}`} key={item.id}>
            {item.name}
            <Link to={`/faculties/${item.id}/description`}>
              <span className={styles.listItemDetailsLink}>Details</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultiesPage;
