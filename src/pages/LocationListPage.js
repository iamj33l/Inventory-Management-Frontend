import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function LocationListPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get('/locations/').then(res => setLocations(res.data));
  }, []);

  const handleDelete = id => {
    api.delete(`/locations/${id}/delete/`).then(() =>
      setLocations(prev => prev.filter(loc => loc.id !== id))
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Location List</h2>
        <Link to="/locations/add" className="btn btn-primary">Add Location</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pincode</th>
            <th>Address</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(loc => (
            <tr key={loc.id}>
              <td>{loc.name}</td>
              <td>{loc.pin_code}</td>
              <td>{loc.address}</td>
              <td>{loc.capacity}</td>
              <td>
                <Link to={`/locations/${loc.id}/edit`} className="btn btn-sm btn-primary m-2">Edit</Link>
                <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(loc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationListPage;
