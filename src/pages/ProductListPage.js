import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/Navbar';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/').then(res => setProducts(res.data));
  }, []);

  const handleDelete = id => {
    api.delete(`/products/${id}/delete/`).then(() => {
      setProducts(prev => prev.filter(p => p.id !== id));
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>
        <Link to="/products/add" className="btn btn-primary">Add Product</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price(per unit)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>{prod.price}</td>
              <td>{prod.category ? prod.category : 'Uncategorized'}</td>
              <td>
                <Link to={`/products/${prod.id}/edit`} className="btn btn-sm btn-primary m-2">Edit</Link>
                <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListPage;
