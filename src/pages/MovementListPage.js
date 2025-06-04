import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function MovementListPage() {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        api.get('/product-movements/').then(res => setMovements(res.data));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Product Movements</h2>
                <Link to="/movements/add" className="btn btn-primary">Add Movement</Link>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Qty</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(mv => (
                        <tr key={mv.id}>
                            <td>{mv.product.name}</td>
                            <td>{mv.from_location != null ? mv.from_location.name : '-'}</td>
                            <td>{mv.to_location != null ? mv.to_location.name : '-'}</td>
                            <td>{mv.qty}</td>
                            <td>
                                <span style={{
                                    backgroundColor:
                                        mv.from_location === null && mv.to_location !== null
                                            ? '#d4edda' : 
                                            mv.from_location !== null && mv.to_location === null
                                                ? '#f8d7da' : 
                                                '#d1ecf1',   
                                    color: mv.from_location === null && mv.to_location !== null
                                            ? 'green' : 
                                            mv.from_location !== null && mv.to_location === null
                                                ? 'red' : 
                                                'blue', 
                                    padding: '4px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                    fontWeight: 'normal',
                                    fontSize: 'inherit',
                                }}>
                                    {mv.from_location === null && mv.to_location !== null
                                        ? 'Import'
                                        : mv.from_location !== null && mv.to_location === null
                                            ? 'Export'
                                            : 'Movement'}
                                </span>
                            </td>


                            <td>{new Date(mv.timestamp).toLocaleString()}</td>
                            <td>
                                <Link to={`/movements/${mv.id}/edit/`} className="btn btn-sm btn-primary">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovementListPage;
