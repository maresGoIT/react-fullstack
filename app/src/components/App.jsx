import Sidebar from './Sidebar';
import Tutors from './Tutors';
import University from './University/University';

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className='main'>
        <h1 className='page-title'>University Information</h1>
        <University />
        <Tutors />
      </main>
    </div>
  );
}

export default App;
