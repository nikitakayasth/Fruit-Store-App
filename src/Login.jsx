import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let Navigate = useNavigate();
  let [message, setMessage] = useState("");
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    // data from local stprage
    //let users = JSON.parse(localStorage.getItem("users")) || [];
   const res = await fetch("http://localhost:3000/users");
const users = await res.json();
    // check valid user
    let validUser = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      console.log(validUser);

       if (validUser.role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/";
  }
      // setMessage(`Welcome ${validUser.username}`);
      // setMessage("login sucessful");
      alert("login successful..");
      Navigate("/home");
    } else {
      setMessage("invalid user");
    }
  };

  setTimeout(() => {
    setMessage("");
  }, 1000);

  return (
    <>
      <div className="form border border-2 my-3">
        <form className="login-form form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            value={data.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="submit"
            value="Login"
            className="bg-primary text-white"
          />
          <p className="text-danger">{message}</p>
          <input
            type="button"
            value="Go to Signup"
            onClick={() => Navigate("/signup")}
            className="bg-secondary text-center text-white"
          />
        </form>
      </div>
    </>
  );
}
