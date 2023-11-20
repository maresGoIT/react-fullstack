import React, { Component } from "react";
import styles from "./Cities.module.css";
import Icon from "../common/Icon/Icon";
import Button from "../common/Button/Button";
import AddCitiesForm from "./AddCitiesForm";
import Dropdown from "../common/Dropdown/Dropdown";
import Modal from "../common/Modal/Modal";
import ErrorAlert from "../common/ErrorAlert";
import AlternateButton from "../common/Button/AlternateButton";
import citiesService from "../../service/citiesService";

const CITIES_KEY = "cities";

class CitiesClass extends Component {
  constructor(props) {
    super(props);
    // Adaug scope-ul clasei Modal, care imi ofera acces la props si state
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }

  state = {
    isAddFormVisible: false,
    isEditModalOpen: false,
    isLoading: false,
    isDeleteModalOpen: false,
    error: "",
    selectedItem: {
      id: 0,
      name: "",
    },
    list: [],
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const response = await citiesService.get();
      this.setState({ list: response });
    } catch (error) {
      this.setState({
        error: "A aparut o eroare la obtinerea listei de orase.",
      });
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState?.list.length !== this.state.list) {
      localStorage.setItem(CITIES_KEY, JSON.stringify(this.state.list));
    }
  }

  render() {
    const {
      isAddFormVisible,
      list,
      error,
      isEditModalOpen,
      isDeleteModalOpen,
      selectedItem,
    } = this.state;

    return (
      <section className="section">
        <h2>
          <Icon variant="pin" label="Cities" />
          <span>Cities</span>
        </h2>
        <div className={`${styles.itemsList}`}>{this.renderList(list)}</div>

        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            handleClose={() => {
              this.setState({ isEditModalOpen: false });
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
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        selectedItem: {
                          ...prevState.selectedItem,
                          name: e.target.value,
                        },
                      };
                    })
                  }
                ></input>
              </label>
              <Button action={() => this.handleEditItem(selectedItem)}>
                SAVE
              </Button>
            </form>
          </Modal>
        )}
        {isDeleteModalOpen && (
          <Modal
            isOpen={isDeleteModalOpen}
            handleClose={() => {
              this.setState({ isDeleteModalOpen: false });
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
              <AlternateButton
                action={() =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      isDeleteModalOpen: false,
                    };
                  })
                }
              >
                No
              </AlternateButton>
              <Button action={() => this.handleDeleteItem(selectedItem)}>
                Yes
              </Button>
            </div>
          </Modal>
        )}

        {isAddFormVisible && (
          <AddCitiesForm onFormSubmit={this.handleAddItem} />
        )}

        {error.length > 0 && <ErrorAlert errors={error} />}

        <div className={"mt-16"}>
          <Button
            action={() =>
              this.setState({
                isAddFormVisible: true,
              })
            }
          >
            Add City
          </Button>
        </div>
      </section>
    );
  }

  async handleEditItem(editedItem) {
    const yourNextList = [...this.state.list];

    if (yourNextList.find((el) => el.name === editedItem.name)) {
      this.setState({
        error: "A city with the same name already exists.",
      });

      return;
    }

    const item = yourNextList.find((el) => el.id === editedItem.id);
    item.name = editedItem.name;

    try {
      await citiesService.update(editedItem.id, editedItem);
      this.setState((prevState) => {
        return {
          ...prevState,
          error: "",
          isEditModalOpen: false,
          list: yourNextList,
        };
      });
    } catch (error) {
      this.setState({
        error: "Nu a putut fi modificat orasul",
      });
    }
  }

  async handleDeleteItem(item) {
    const yourNextList = this.state.list.filter((el) => el.id !== item.id);

    try {
      await citiesService.remove(item.id);
      this.setState((prevState) => {
        return {
          ...prevState,
          error: "",
          isDeleteModalOpen: false,
          list: yourNextList,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  showEditModal = (data) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isEditModalOpen: true,
        selectedItem: {
          id: data.id,
          name: data.name,
        },
      };
    });
  };

  showDeleteModal = (data) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isDeleteModalOpen: true,
        selectedItem: {
          id: data.id,
          name: data.name,
        },
      };
    });
  };

  async handleAddItem(item) {
    const list = this.state.list.sort((a, b) => a.id > b.id);

    if (list.find((el) => el.name === item.name)) {
      this.setState({
        error: "A city with the same name already exists.",
      });

      return;
    }

    const newId = list.length > 0 ? list[list.length - 1].id + 1 : 0;

    const itemToAdd = {
      id: newId,
      name: item.name,
    };

    try {
      await citiesService.create(itemToAdd);

      this.setState((prevState) => {
        return {
          error: "",
          list: [...prevState.list, itemToAdd],
          isAddFormVisible: false,
        };
      });
    } catch (error) {
      this.setState({
        error: "Nu a putut fi creat orasul.",
      });
    }
  }

  renderList(list) {
    if (!list || list.length === 0) {
      return (
        <div className="box box--no-items">There are no cities added.</div>
      );
    }

    return list.map((item) => (
      <div key={item.id} className={`box relative ${styles.listItem}`}>
        <span>{item.name}</span>
        <Dropdown
          onEdit={() => this.showEditModal(item)}
          onDelete={() => this.showDeleteModal(item)}
        />
      </div>
    ));
  }
}

export default CitiesClass;
