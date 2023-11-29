import React, { useEffect, useState } from "react";
import Button from "../../../common/components/Button/Button";
import PropTypes from "prop-types";

const AddTutor = (props) => {
  const { onFormSubmit } = props;

  //TODO In lectia 8.
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      surname,
      name: username,
      phone,
      email,
      city,
    };
    onFormSubmit(user);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    const action = {
      surname: setSurname,
      username: setUsername,
      phone: setPhone,
      email: setEmail,
      city: setCity,
    };

    // action["surname"] -> setSurname(value)

    action[name](value);
  }

  useEffect(() => {
    // componentWillMount
    console.log("AddTutor Form a fost montat");

    // componentWillUnmount
    return () => {
      console.log("AddTutor Form va fi sters din DOM");
    };
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Add Tutor</h1>
      <label>
        <span>Surname</span>
        <input
          value={surname}
          name="surname"
          type="text"
          placeholder="Surname"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Name</span>
        <input
          value={username}
          name="username"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Phone</span>
        <input
          value={phone}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Email</span>
        <input
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>City</span>
        <input
          value={city}
          name="city"
          type="text"
          placeholder="City"
          onChange={handleChange}
          required
        />
      </label>
      <Button className={"mt-16"} type="submit">
        Invite
      </Button>
    </form>
  );
};

AddTutor.propTypes = { onFormSubmit: PropTypes.func };

export default AddTutor;
