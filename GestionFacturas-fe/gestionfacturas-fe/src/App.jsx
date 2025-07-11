import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invoices from './pages/invoices';
import NavbarComponent from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
        <Routes>
          <Route path="/" element={<Invoices />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;