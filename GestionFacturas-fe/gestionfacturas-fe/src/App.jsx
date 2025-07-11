import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import NavbarComponent from './components/navbar';
import Invoices from './pages/invoices';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
        <Routes>
          <Route path="/" element={<Dashboard />} />3
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;