import React, { Component } from "react";
import Button from "../common/Button/Button";
import PropTypes from "prop-types";

export default class AddFacultiesForm extends Component {
  static propTypes = { onFormSubmit: PropTypes.func };

  state = {
    faculty: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onFormSubmit(this.state);
  };

  handleChange = (evt) => {
    const { value } = evt.target;

    this.setState({ faculty: value });
  };

  render() {
    const { faculty } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1>Adding a faculty</h1>
        <label>
          <span>Name</span>
          <input
            value={faculty}
            name="faculty"
            type="text"
            placeholder="Faculty"
            onChange={this.handleChange}
            required
          />
        </label>

        <Button className={"mt-16"} type="submit">
          Add
        </Button>
      </form>
    );
  }
}
