import React, { useContext, useEffect, useState } from "react";
import styles from "./Tutors.module.css";
import Icon from "../../../common/components/Icon/Icon";
import AddTutor from "./AddTutor";
import Button from "../../../common/components/Button/Button";
import SearchBar from "../../../common/components/SearchBar/SearchBar";
import tutorsService from "../../../common/service/tutorsService";
import Loading from "../../../common/components/Loading/Loading";
import Error from "../../../common/components/Error/Error";
import { ColorContext } from "../../../SharedLayout";
import { useRef } from "react";
import {
  addTutor,
  deleteTutor,
  editTutor,
} from "../../../../redux/slices/tutorsSlice";
import { useDispatch, useSelector } from "react-redux";

const TUTORS_KEY = "tutors";

export default function Tutors() {
  const contextValue = useContext(ColorContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const list = useSelector((state) => state.tutors);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const test = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function getTutors() {
  //     const response = await tutorsService.get();
  //     setList(response);
  //   }

  //   setIsLoading(true);
  //   getTutors()
  //     .catch(() => {
  //       setError("A aparut o eroare la obtinerea listei de tutori.");
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  return (
    <section ref={test} className="section">
      <code>Color: {contextValue}</code>
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
          placeholder="Search for tutor..."
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

  function handleAddTutor(data) {
    const tutorToAdd = {
      firstName: data.name,
      lastName: data.surname,
      telephone: data.phone,
      email: data.email,
      city: data.city,
    };

    dispatch(addTutor(tutorToAdd));
    setIsAddFormVisible(false);
  }
}
