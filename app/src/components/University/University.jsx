import React, { Component, useState } from 'react';
import Paper from '../Paper';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

import styles from './University.module.css';
import Modal from 'components/Modal';


export default function University() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imagePath = '/images/School@2x 1.png';

  function toggleModal() {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <section className="section">
      <Modal isOpen={isModalVisible} handleClose={() => {toggleModal()}} header={"University"}>
        Add edit form
      </Modal>

      <div className={styles.university}>
        <div className={styles.info}>
          <Paper>
            {/* <img src={schoolImage} alt="School" /> */}
            <img
              className={styles.universityIcon}
              src={`${process.env.PUBLIC_URL}${imagePath}`}
              alt="School"
            />
            <p>university</p>
            <h3 className={styles.title}>MIT</h3>
            <div className={styles.controls}>
              <button className="button-icon" onClick={toggleModal}>
                <HiPencilAlt />
              </button>
              <button className="button-icon">
                <HiTrash />
              </button>
            </div>
          </Paper>
        </div>

        <div className={styles.description}>
          Experience, a concentration of knowledge and the ability to avoid
          most recruiting mistakes. We know what most local and foreign
          companies want and we can give it to you. And we are constantly
          improving our programming courses, adding something new there. You
          can see the success stories of our alumni for yourself to see the
          effectiveness of our teaching methodology. Yes, we will start with
          the basics and the most basic information. We know that most people
          come to us with zero knowledge.
        </div>
      </div>
    </section>
  );
}

