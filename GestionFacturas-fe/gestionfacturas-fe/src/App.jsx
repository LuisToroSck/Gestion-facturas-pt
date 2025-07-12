import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import NavbarComponent from './components/navbar';
import Invoices from './pages/invoices';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Dashboard />} />3
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;