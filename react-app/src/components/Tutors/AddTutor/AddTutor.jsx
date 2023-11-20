import React, { Component } from "react";
import Button from "../../common/Button/Button";
import PropTypes from "prop-types";

export default class AddTutor extends Component {
  //TODO In lectia 8.
  static propTypes = { onFormSubmit: PropTypes.func };

  state = {
    surname: "",
    name: "",
    phone: "",
    email: "",
    city: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state);
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    console.log("AddTutor Form a fost montat");
  }

  componentWillUnmount() {
    console.log("AddTutor Form va fi sters din DOM");
  }

  render() {
    const { surname, name, phone, email, city } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1>Add Tutor</h1>
        <label>
          <span>Surname</span>
          <input
            value={surname}
            name="surname"
            type="text"
            placeholder="Surname"
            onChange={this.handleChange}
            required
          />
        </label>

        <label>
          <span>Name</span>
          <input
            value={name}
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            required
          />
        </label>
        <Button className={"mt-16"} type="submit">
          Invite
        </Button>
      </form>
    );
  }
}
