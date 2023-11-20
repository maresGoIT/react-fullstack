import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorAlert.module.css";
import { HiX } from "react-icons/hi";

const ErrorAlert = ({ errors }) => {
  const [isClosed, setIsClosed] = useState(false);

  if (errors.length === 0 || isClosed) {
    return null;
  }

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    <section className={styles.alert}>
      <div className={styles.content}>
        <p>{errors}</p>
        <span className={styles.close} onClick={handleClose}>
          <HiX />
        </span>
      </div>
    </section>
  );
};

ErrorAlert.propTypes = {
  errors: PropTypes.string.isRequired,
};

export default ErrorAlert;
