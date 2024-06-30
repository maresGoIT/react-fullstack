import PropTypes from 'prop-types';
import Tutor from './Tutor';
import styles from "./TutorsList.module.css";

const TutorsList = ({ tutors }) => {
  function renderList(items) {
    return items.map(item => (
      <Tutor key={item.phone} item={item} />
    ));
  }

  return <div className={styles.list}>{renderList(tutors)}</div>;
};

export default TutorsList;

TutorsList.propTypes = {
  tutors: PropTypes.array,
};
