import PropTypes from 'prop-types';
import Tutor from './Tutor';
import Button from 'components/Button';
import { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import styles from './TutorsList.module.css';
import Input from 'components/common/Input/Input';
import axios from 'axios';
import Loading from 'components/common/Loading';
import Alert from 'components/common/Alert';
import useToggle from 'hooks/useToggle';
import { useDebounce } from "@uidotdev/usehooks";

axios.defaults.baseURL = 'http://localhost:3001';

const INITIAL_FORM_STATE = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  city: '',
};

export default function TutorsList(props) {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const [isFormVisible, toggleForm] = useToggle(false);
  const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/tutors');
        setTutors(response.data);
        setError(null);
      } catch (error) {
        console.error(error.message);
        setError('Lista de tutori nu a putut fi obtinuta.');
      } finally {
        setLoading(false);
      }
    };

    console.log('Aici');
    fetchData();
  }, []);

  function renderList(items) {
    return items.map(item => (
      <Tutor
        key={item.phone}
        item={item}
        handleDelete={() => deleteTutor(item.id)}
      />
    ));
  }

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  function handleSubmit (evt) {
    evt.preventDefault();

    addTutor();
  };

  function getTutorsCount (tutors) {
    return tutors.length;
  };

  async function deleteTutor(id) {
    try {
      await axios.delete(`/tutors/${id}`);
      const data = tutors.filter(el => el.id !== id);

      setTutors([...data]);
    } catch (error) {
      setError('Tutorele nu a putut fi sters.');
    }
  }

  async function addTutor() {
    const data = formData;

    try {
      const response = await axios.post('/tutors', data);

      setTutors([...tutors, response.data]);
      setFormData( { ...INITIAL_FORM_STATE })
    } catch (error) {
      setError('Tutorele nu a putut fi adaugat.');
    }
  }

  const filteredTutorsList = tutors.filter(tutor => {
    return (
      tutor.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      tutor.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  });

  return (
    <section className="section">
      <h2 className="h2">Tutors</h2>
      <input
        type="text"
        name="searchTerm"
        value={searchTerm}
        onChange={e =>
          setSearchTerm(e.target.value)
        }
      />
      <div className={styles.list}>
        {loading && <Loading />}
        {error && <Alert message={error} />}
        {renderList(filteredTutorsList)}
        <p>
          Number of tutors found {getTutorsCount(filteredTutorsList)}
        </p>
        <p>Number of tutors {getTutorsCount(tutors)} </p>
      </div>

      {isFormVisible && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Adding a tutor</h3>
          <Input
            label="Surname"
            name="firstName"
            type="text"
            value={formData.firstName}
            handleChange={handleChange}
            required={true}
          />

          <Input
            label="Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            handleChange={handleChange}
            required={true}
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            handleChange={handleChange}
            required={true}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            required={true}
          />

          <Input
            label="City"
            name="city"
            type="text"
            value={formData.city}
            handleChange={handleChange}
            required={true}
          />

          <Button type="submit" handleClick={() => {}}>
            Invite
          </Button>
        </form>
      )}

      <Button handleClick={toggleForm}>
        <FaPlusCircle />
        Add Tutor
      </Button>
    </section>
  );
}

TutorsList.propTypes = {
  tutors: PropTypes.array,
};
