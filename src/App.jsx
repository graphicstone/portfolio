import './App.css';
import LandingPage from './layouts/landing-page/LandingPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  );
}

export default App;
