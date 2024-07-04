import PropTypes from 'prop-types';
import Tutor from './Tutor';
import Button from 'components/Button';
import { Component } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import styles from './TutorsList.module.css';
import data from '../../utils/data.json';
import Input from 'components/common/Input/Input';

const INITIAL_FORM_STATE = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  city: '',
};

const INITIAL_STATE = {
  tutors: data.tutors,
  searchTerm: '',
  isFormVisible: true,
  newTutor: { ...INITIAL_FORM_STATE },
};

class TutorsList extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTutorsCount = this.getTutorsCount.bind(this);
  }

  renderList(items) {
    return items.map(item => <Tutor key={item.phone} item={item} />);
  }

  toggleForm() {
    this.setState(state => ({
      isFormVisible: !state.isFormVisible,
      ...state,
    }));
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      ...this.state,
      newTutor: {
        ...this.state.newTutor,
        [name]: value,
      },
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newTutor = this.state.newTutor;

    this.setState({
      ...this.state,
      tutors: [...this.state.tutors, newTutor],
      newTutor: { ...INITIAL_FORM_STATE },
    });
  };

  getTutorsCount = (tutors) => {
    return tutors.length;
  };

  render() {
    const filteredTutorsList = this.state.tutors.filter(tutor => {
      const searchTerm = this.state.searchTerm;

      return tutor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             tutor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
      <section className="section">
        <h2 className="h2">Tutors</h2>
        <input
          type="text"
          name="searchTerm"
          value={this.state.searchTerm}
          onChange={e =>
            this.setState({ ...this.state, searchTerm: e.target.value })
          }
        />
        <div className={styles.list}>
          {this.renderList(filteredTutorsList)}
          <p>Number of tutors found {this.getTutorsCount(filteredTutorsList)}</p>
          <p>Number of tutors {this.getTutorsCount(this.state.tutors)} </p>
        </div>

        {this.state.isFormVisible && (
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <h3>Adding a tutor</h3>
            <Input
              label="Surname"
              name="firstName"
              value={this.state.newTutor.firstName}
              handleChange={this.handleChange}
              required={true}
            />

            <label>
              <span>Name</span>
              <input
                name="lastName"
                type="text"
                value={this.state.newTutor.lastName}
                onChange={this.handleChange}
                required
              />
            </label>

            <label>
              <span>Phone Number</span>
              <input
                name="phone"
                type="tel"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                value={this.state.newTutor.phone}
                onChange={this.handleChange}
                required
              />
            </label>

            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={this.state.newTutor.email}
                onChange={this.handleChange}
                required
              />
            </label>

            <label>
              <span>City</span>
              <input
                name="city"
                type="text"
                value={this.state.newTutor.city}
                onChange={this.handleChange}
                required
              />
            </label>

            <Button type="submit" handleClick={() => {}}>
              Invite
            </Button>
          </form>
        )}
        <Button handleClick={this.toggleForm}>
          <FaPlusCircle />
          Add Tutor
        </Button>
      </section>
    );
  }
}

export default TutorsList;

TutorsList.propTypes = {
  tutors: PropTypes.array,
};
