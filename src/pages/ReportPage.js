import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function ReportPage() {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        api.get('/report/product-balance/').then(res => setReports(res.data));
    }, []);


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Product Balance Report</h2>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Warehouse</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.product}>
                            <td>{report.product}</td>
                            <td>{report.warehouse}</td>
                            <td>{report.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReportPage;