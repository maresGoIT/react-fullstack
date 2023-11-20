import React, { useEffect, useState } from "react";
import styles from "./Tutors.module.css";
import Icon from "../common/Icon/Icon";
import AddTutor from "./AddTutor/AddTutor";
import Button from "../common/Button/Button";
import SearchBar from "../common/SearchBar/SearchBar";
import tutorsService from "../../service/tutorsService";
import Loading from "../common/Loading/Loading";
import Error from "../common/Error/Error";

const TUTORS_KEY = "tutors";

export default function Tutors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTutors() {
      const response = await tutorsService.get();
      setList(response);
    }

    setIsLoading(true);
    getTutors()
      .catch(() => {
        setError("A aparut o eroare la obtinerea listei de tutori.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(TUTORS_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <section className="section">
      <h2>
        <Icon variant="cat" label="Tutors" />
        <span>Tutors</span>
      </h2>
      {error.length > 0 && <Error message={error} />}
      {!error && renderTutors()}
    </section>
  );

  function renderTutors() {
    const filteredList =
      searchTerm.length > 0
        ? list.filter((el) => el.firstName.includes(searchTerm))
        : list;

    return (
      <>
        <div className={`box ${styles.tutorsList}`}>
          {renderList(filteredList)}
        </div>

        {isAddFormVisible && <AddTutor onFormSubmit={handleAddTutor} />}

        {isLoading && <Loading />}

        <SearchBar
          handleChange={(evt) => {
            setSearchTerm(evt.target.value);
          }}
          searchTerm={searchTerm}
        />

        <div className={"mt-16"}>
          <Button
            action={() => {
              setIsAddFormVisible(true);
            }}
          >
            Add Tutor
          </Button>
        </div>
      </>
    );
  }

  // Render the list of tutors
  function renderList(items) {
    if (!items || !Array.isArray(items)) {
      return <>Loading...</>;
    }

    if (items.length === 0) {
      const hasSearchTerm = searchTerm.length > 0;

      return hasSearchTerm ? (
        <div>No tutors matching with this name have been found.</div>
      ) : (
        <div>There are no tutors.</div>
      );
    }

    return items.map((el) => {
      const name = `${el.firstName} ${el.lastName}`;

      return (
        <div key={el.id} className={styles.tutorsListItem}>
          <div>{name}</div>
          <div className={styles.address}>
            <span>{el.email}</span>
            <span>{el.telephone}</span>
            <span>{el.location}</span>
          </div>
          <div>{el.role}</div>
        </div>
      );
    });
  }

  // handle add tutor
  function handleAddTutor(data) {
    const newId = list.length > 0 ? list[list.length - 1].id : 0;

    const tutorToAdd = {
      id: newId,
      firstName: data.name,
      lastName: data.surname,
      telephone: data.phone,
      email: data.email,
      city: data.city,
      role: "Member",
    };

    setList([...list, tutorToAdd]);
    setIsAddFormVisible(false);
  }
}
