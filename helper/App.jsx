import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  componentDidMount() {
    // Aici puteți adăuga orice cod doriți să se execute la montarea componentei
    console.log('Modal has been mounted');
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Aici puteți adăuga orice cod doriți să se execute la demontarea componentei
    console.log('Modal will be unmounted');
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, onClose, children } = this.props;

    if (!isOpen) {
      return null;
    }

    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>,
      document.body
    );
  }
}

class App extends React.Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={this.closeModal}>
          <h2>Modal Content</h2>
          <p>This is a modal window.</p>
        </Modal>
      </div>
    );
  }
}

export default App;
