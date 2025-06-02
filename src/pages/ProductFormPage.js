import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function ProductFormPage() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}/`).then(res => setFormData(res.data));
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const request = id
      ? api.put(`/products/${id}/update/`, formData)
      : api.post('/products/create/', formData);

    request.then(() => navigate('/'));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
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
          <label>Description</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number"
            className="form-control"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select
            className="form-select"
            value={formData.category || ''}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="toys">Toys</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductFormPage;
