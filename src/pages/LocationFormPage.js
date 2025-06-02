import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function LocationFormPage() {
  const [formData, setFormData] = useState({ name: '', pin_code: '', address: '', capacity: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/locations/${id}/`).then(res => setFormData(res.data));
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const request = id
      ? api.put(`/locations/${id}/update/`, formData)
      : api.post('/locations/create/', formData);

    request.then(() => navigate('/locations'));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Location' : 'Add Location'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Pincode</label>
          <input
            type="number"
            className="form-control"
            value={formData.pin_code}
            onChange={e => setFormData({ ...formData, pin_code: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Capacity</label>
          <input
            type="number"
            className="form-control"
            value={formData.capacity}
            onChange={e => setFormData({ ...formData, capacity: e.target.value })}
            required
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/locations')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default LocationFormPage;
