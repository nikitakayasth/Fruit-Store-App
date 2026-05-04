import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let Navigate = useNavigate();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [message, setMessage] = useState("");
  const handleChange =  (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
        const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 🔹 STEP 1: check duplicate user from server
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    const existuser = users.find(
      (user) => user.email === formData.email
    );

    if (existuser) {
      setMessage("User already exists");
      return;
    }

    // 🔹 STEP 2: create new user
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user", // ✅ important
    };

    // 🔹 STEP 3: save to JSON server
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    console.log(data);
    

    alert("Signup successful");

    
    Navigate("/login"); // redirect

  } catch (error) {
    console.log(error);
  }
};


return(
  <>
      {" "}
      <div className="form border border-2 my-3">
        <form className="signup-form form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
            />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
            />
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />
          <input
            type="submit"
            value="Signup"
            className="bg-success text-white text-center"
          />
          <p className="text-danger">{message}</p>

          <input
            type="button"
            value="Go to login"
            onClick={() => Navigate("/login")}
            className="bg-secondary text-center text-white"
            />
        </form>
      </div>
    </>
  );

};
