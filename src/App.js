import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import LocationListPage from './pages/LocationListPage';
import LocationFormPage from './pages/LocationFormPage';
import MovementListPage from './pages/MovementListPage';
import MovementFormPage from './pages/MovementFormPage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/add" element={<ProductFormPage />} />
        <Route path="/products/:id/edit" element={<ProductFormPage />} />
        
        <Route path="/locations" element={<LocationListPage />} />
        <Route path="/locations/add" element={<LocationFormPage />} />
        <Route path="/locations/:id/edit" element={<LocationFormPage />} />

        <Route path="/movements" element={<MovementListPage />} />
        <Route path="/movements/add" element={<MovementFormPage />} />
        <Route path="/movements/:id/edit" element={<MovementFormPage />} />

        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
