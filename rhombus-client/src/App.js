import './App.css';
import Navbar from './components/Navbar';
import CSVForm from './components/CSVForm';
import PresentColumns from './components/PresentColumns';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div class='main-content'>

      <CSVForm></CSVForm>

      <PresentColumns></PresentColumns>

    </div>

    </>
  );
}

export default App;
