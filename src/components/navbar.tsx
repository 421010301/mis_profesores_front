import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
      <div className="container">
        <button
          className="navbar-toggler border-0 ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-center">
            <ul className="navbar-nav gap-lg-5">
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/table">
                  Table
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/input">
                  Input
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/pagination">
                  Pagination
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/options">
                  Options
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" href="/styles">
                  Styles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
