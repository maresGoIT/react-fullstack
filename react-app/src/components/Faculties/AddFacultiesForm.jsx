import React, { useState } from "react";
import Button from "../common/Button/Button";
import PropTypes from "prop-types";

const AddFacultiesForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ name, description, history });
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    const action = {
      name: setName,
      description: setDescription,
      history: setHistory,
    };

    // action["surname"] -> setSurname(value)

    action[name](value);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Adding a faculty</h1>
      <label>
        <span>Name</span>
        <input
          value={name}
          name="name"
          type="text"
          placeholder="Faculty"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          value={description}
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <span>History</span>
        <textarea
          value={history}
          name="history"
          type="text"
          placeholder="History"
          onChange={handleChange}
          required
        />
      </label>
      <Button className={"mt-16"} type="submit">
        Add
      </Button>
    </form>
  );
};

AddFacultiesForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddFacultiesForm;
