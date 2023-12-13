import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Icon from "../../../common/components/Icon/Icon";
import Button from "../../../common/components/Button/Button";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import Modal from "../../../common/components/Modal/Modal";
import ErrorAlert from "../../../common/components/ErrorAlert";
import AlternateButton from "../../../common/components/Button/AlternateButton";
import citiesService from "../../../common/service/citiesService";

import AddCitiesForm from "./AddCitiesForm";

import styles from "./Cities.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCity,
  deleteCity,
  editCity,
} from "../../../../redux/slices/citiesSlice";

const CITIES_KEY = "cities";
const Cities = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: "",
  });
  //const [list, setList] = useState([]);
  const list = useSelector((state) => state.cities);

  // useEffect(() => {
  //   // Async folosit la nivelul functiei mari pentru useEffect duce la efecte nedorite,
  //   // de aceea cream o functie separata in interiorul functiei de la useEffect
  //   async function getCities() {
  //     const response = await citiesService.get();
  //     setList(response);

  //     return response;
  //   }

  //   // Aici e logica de executie a functie de useEffect
  //   setIsLoading(true);
  //   getCities()
  //     .catch((error) => {
  //       console.error(error);
  //       setError("A aparut o eroare la obtinerea listei de orase.");
  //     })
  //     .finally(setIsLoading(false));
  // }, []);

  return (
    <section className="section">
      <h2>
        <Icon variant="pin" label="Cities" />
        <span>Cities</span>
      </h2>
      <div className={`${styles.itemsList}`}>{renderList(list)}</div>

      {isLoading && "se incarca..."}
      {isEditModalOpen &&
        createPortal(
          <Modal
            isOpen={isEditModalOpen}
            handleClose={() => {
              setIsEditModalOpen(false);
            }}
            header={{
              icon: <Icon variant={"pencil"} size={40} />,
              label: "Edit city information",
            }}
          >
            <form className={`form modal-form`}>
              <label>
                <span>City</span>
                <input
                  type="text"
                  required
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      name: e.target.value,
                    })
                  }
                ></input>
              </label>
              <Button action={() => handleEditItem(selectedItem)}>SAVE</Button>
            </form>
          </Modal>,
          document.body
        )}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          handleClose={() => {
            setIsDeleteModalOpen(false);
          }}
          header={{
            icon: <Icon variant={"handpointing"} size={40} />,
            label: "City Removal",
          }}
        >
          <div>
            All materials and information about the city will be deleted
          </div>
          <div className={styles.deleteModalControls}>
            <AlternateButton action={() => setIsDeleteModalOpen(false)}>
              No
            </AlternateButton>
            <Button action={() => handleDeleteItem(selectedItem)}>Yes</Button>
          </div>
        </Modal>
      )}

      {isAddFormVisible && <AddCitiesForm onFormSubmit={handleAddItem} />}

      {error.length > 0 && <ErrorAlert errors={error} />}

      <div className={"mt-16"}>
        <Button action={() => setIsAddFormVisible(true)}>Add City</Button>
      </div>
    </section>
  );

  async function handleEditItem(item) {
    const yourNextList = [...list];

    if (yourNextList.find((el) => el.name === item.name)) {
      setError("A city with the same name already exists.");

      return;
    }

    const editedItem = list.find((el) => el.id === selectedItem.id);

    try {
      dispatch(editCity(editedItem));
      //await citiesService.update(editedItem.id, editedItem);
      setError("");
      setIsEditModalOpen(false);
    } catch (error) {
      setError("Nu a putut fi modificat orasul");
    }
  }

  async function handleDeleteItem(item) {
    try {
      setError("");
      dispatch(deleteCity(item.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  }

  function showEditModal(data) {
    setIsEditModalOpen(true);
    setSelectedItem({
      id: data.id,
      name: data.name,
    });
  }

  function showDeleteModal(data) {
    setIsDeleteModalOpen(true);
    setSelectedItem({
      id: data.id,
      name: data.name,
    });
  }

  async function handleAddItem(item) {
    if (list.find((el) => el.name === item.name)) {
      setError("A city with the same name already exists.");

      return;
    }

    try {
      dispatch(addCity(item));
      setError("");
      setIsAddFormVisible(false);
    } catch (error) {
      setError("Nu a putut fi create orasul");
    }
  }

  function renderList(list) {
    if (!list || list.length === 0) {
      return (
        <div className="box box--no-items">There are no cities added.</div>
      );
    }

    return list.map((item) => (
      <div key={item.id} className={`box relative ${styles.listItem}`}>
        <span>{item.name}</span>
        <Dropdown
          onEdit={() => showEditModal(item)}
          onDelete={() => showDeleteModal(item)}
        />
      </div>
    ));
  }
};

Cities.propTypes = {};

export default Cities;
