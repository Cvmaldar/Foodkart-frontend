import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
let Navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault(); // React uses synthetic events to handle events from button, input and form elements called preventDefault
    const response = await fetch("https://foodkart-ehyg.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter a valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
      Navigate("/");
      
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div>
          <Navbar />
        </div>

        <div className="container">
          <form
            className="w-50 m-auto mt-5 border bg-dark border-success rounded"
            onSubmit={handlesubmit}
          >
            <div className="m-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                name="password"
              />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
              I'a   m new user
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
