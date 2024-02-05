import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import { initMDB } from "mdb-ui-kit";
import Auth from "../../utils/auth";

initMDB();

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    const navToggle = document.querySelector(".navbar-toggler");
    const targetID = navToggle.getAttribute("data-mdb-target");
    const target = document.querySelector(targetID);

    if (target) {
      target.classList.toggle("show");
    }
  };
  console.log("Auth.loggedIn:", Auth.loggedIn());
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-custom ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <i className="fas fa-bars"></i>
        </button>
        <Link className="logo" to="/">
          <img
            src={Logo}
            alt="logo"
            style={{ height: "200px" }}
            className="d-inline-block align-top"
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Other navigation links */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i
                  className="fa-solid fa-house fa p-auto"
                  style={{ color: "#da6d44" }}
                ></i>{" "}
                Home
              </Link>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i
                      className="fa-solid fa-gauge fa p-auto"
                      style={{ color: "#da6d44" }}
                    ></i>{" "}
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/joinedgames">
                    <i
                      className="fa-solid fa-thumbtack fa p-auto"
                      style={{ color: "#da6d44" }}
                    ></i>{" "}
                    Games
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>

          <Link to="/search" className="btn" style={{ width: "auto" }}>
            Search
          </Link>

          {Auth.loggedIn() ? (
            // If user is authenticated, show logout button
            <button
              onClick={Auth.logout}
              className="btn"
              style={{ width: "auto" }}
            >
              Logout
            </button>
          ) : (
            // If user is not authenticated, show login button
            <Link to="/login" className="btn" style={{ width: "auto" }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
