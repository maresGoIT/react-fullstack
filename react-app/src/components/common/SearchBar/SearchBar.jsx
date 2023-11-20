import PropTypes from "prop-types";
import React from "react";
import styles from "./SearchBar.module.css";
import { HiSearch } from "react-icons/hi";

const SearchBar = ({ handleChange, searchTerm }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder={"Search for tutor..."}
        onChange={handleChange}
        value={searchTerm}
      />
      <span className={styles.icon}>
        <HiSearch />
      </span>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
