import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function MovementFormPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    product: id || '',
    from_location: '',
    to_location: '',
    qty: ''
  });
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products/').then(res => setProducts(res.data));
    api.get('/locations/').then(res => setLocations(res.data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    api.post('/product-movements/create/', formData)
      .then(() => navigate('/movements'))
      .catch(err => {
      const msg = JSON.stringify(err.response?.data.non_field_errors[0] || 'Movement failed.');
      setError(msg);
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add Product Movement</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Product</label>
          <select
            className="form-select"
            value={formData.product}
            onChange={e => setFormData({ ...formData, product: e.target.value })}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>From Location</label>
          <select
            className="form-select"
            value={formData.from_location || ''}
            onChange={e => setFormData({ ...formData, from_location: e.target.value || null })}
          >
            <option value="">-- None --</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>To Location</label>
          <select
            className="form-select"
            value={formData.to_location || ''}
            onChange={e => setFormData({ ...formData, to_location: e.target.value || null })}
          >
            <option value="">-- None --</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={formData.qty}
            onChange={e => setFormData({ ...formData, qty: e.target.value })}
            required
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/movements')}>Cancel</button>
      </form>
    </div>
  );
}

export default MovementFormPage;
