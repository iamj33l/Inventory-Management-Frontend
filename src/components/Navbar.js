import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 justify-content-between">
      <span className="navbar-brand">Inventory Management</span>
      <span className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" end className="nav-link">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/locations" className="nav-link">
              Locations
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/movements" className="nav-link">
              Movements
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className="nav-link">
              Reports
            </NavLink>
          </li>
        </ul>
      </span>
    </nav>
  );
}

export default Navbar;
