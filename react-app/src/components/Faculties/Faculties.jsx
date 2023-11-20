import React, { useState, useEffect } from "react";
import styles from "./Faculties.module.css";
import Icon from "../common/Icon/Icon";
import Button from "../common/Button/Button";
import AddFacultiesForm from "./AddFacultiesForm";
import Dropdown from "../common/Dropdown/Dropdown";
import Modal from "../common/Modal/Modal";
import ErrorAlert from "../common/ErrorAlert";
import AlternateButton from "../common/Button/AlternateButton";

const FACULTIES_KEY = "faculties";

const Faculties = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectedItem, setSelectedItem] = useState({ id: 0, name: "" });
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(FACULTIES_KEY);

    try {
      if (data) {
        setList(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FACULTIES_KEY, JSON.stringify(list));
  }, [list]);

  const handleEditItem = (editedItem) => {
    const yourNextList = [...list];

    if (yourNextList.find((el) => el.name === editedItem.name)) {
      setErrors("A faculty with the same name already exists.");
      return;
    }

    const faculty = yourNextList.find((el) => el.id === editedItem.id);
    faculty.name = editedItem.name;

    setErrors("");
    setIsEditModalOpen(false);
    setList(yourNextList);
  };

  const handleDeleteItem = (item) => {
    const yourNextList = list.filter((el) => el.id !== item.id);

    setErrors("");
    setIsDeleteModalOpen(false);
    setList(yourNextList);
  };

  const showEditModal = (data) => {
    setSelectedItem({
      id: data.id,
      name: data.name,
    });
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (data) => {
    setSelectedItem({
      id: data.id,
      name: data.name,
    });
    setIsDeleteModalOpen(true);
  };

  const handleAddItem = (item) => {
    const sortedList = list.sort((a, b) => a.id > b.id);

    if (sortedList.find((el) => el.name === item.name)) {
      setErrors("A faculty with the same name already exists.");
      return;
    }

    const newId =
      sortedList.length > 0 ? sortedList[sortedList.length - 1].id + 1 : 0;

    const itemToAdd = {
      id: newId,
      name: item.name,
    };

    setErrors("");
    setList([...list, itemToAdd]);
    setIsAddFormVisible(false);
  };

  const renderList = (list) => {
    if (!list || list.length === 0) {
      return (
        <div className="box box--no-items">There are no faculties added.</div>
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
  };

  return (
    <section className="section">
      <h2>
        <Icon variant="robot" label="Faculties" />
        <span>Faculties</span>
      </h2>
      <div className={`${styles.itemsList}`}>{renderList(list)}</div>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          header={{
            icon: <Icon variant={"pencil"} size={40} />,
            label: "Edit faculty information",
          }}
        >
          <form className={`form modal-form`}>
            <label>
              <span>Faculty</span>
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
        </Modal>
      )}
      {/* Render Delete Modal similarly */}

      {isAddFormVisible && <AddFacultiesForm onFormSubmit={handleAddItem} />}

      {errors.length > 0 && <ErrorAlert errors={errors} />}

      <div className={"mt-16"}>
        <Button action={() => setIsAddFormVisible(true)}>Add Faculty</Button>
      </div>
    </section>
  );
};

export default Faculties;
