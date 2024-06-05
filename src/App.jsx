import './App.css';
import LandingPage from './layouts/landing-page/LandingPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
      <Analytics />
    </>
  );
}

export default App;
