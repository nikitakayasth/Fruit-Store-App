import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let { cart } = props;
  let Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(user);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary ">
        <div className="container-fluid ">
          <a className="navbar-brand text-white">Fruit Store</a>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active text-white"
                  aria-current="page"
                  // href="#"
                  role="button"
                  onClick={() => {
                    Navigate("/");
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  // href="#"
                  role="button"
                  onClick={() => {
                    Navigate("/fruits");
                  }}
                >
                  Fruits
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link text-white"
                  // href="#"
                  role="button"
                  onClick={() => {
                    Navigate("/cart");
                  }}
                >
                  Cart ({cart.length})
                </a>
              </li>
              {user ? (
                <>
                  <span
                    className=" d-flex align-items-center text-white "
                    style={{ height: "60px" }}
                  >
                    {" "}
                    welcome {user.username}
                  </span>

                  <button
                    className="btn btn-danger nav-item"
                    onClick={() => {
                      localStorage.removeItem("loggedInUser");
                      Navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white"
                      // href="#"
                      role="button"
                      onClick={() => {
                        Navigate("/login");
                      }}
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link text-white"
                      // href="#"
                      role="button"
                      onClick={() => {
                        Navigate("/signup");
                      }}
                    >
                      Signup
                    </a>
                  </li>
                </>
              )}
              {user && (
                <li className="nav-item ">
                  <a
                    className="nav-link text-white"
                    // href="#"
                    role="button"
                    onClick={() => {
                      Navigate("/orders");
                    }}
                  >
                    Orders
                  </a>
                </li>
              )}
              {user && user.email == "Admin@gmail.com" && (
                <li className="nav-item ">
                  <a
                    className="nav-link text-white"
                    // href="#"
                    role="button"
                    onClick={() => {
                      Navigate("/admin");
                    }}
                  >
                    Admin
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
