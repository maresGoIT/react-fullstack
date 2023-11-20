import React, { useState } from "react";
import Button from "../common/Button/Button";
import PropTypes from "prop-types";

const AddCitiesForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ name });
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setName(value);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Adding a city</h1>
      <label>
        <span>City Name</span>
        <input
          value={name}
          name="name"
          type="text"
          placeholder="City"
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

AddCitiesForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddCitiesForm;
