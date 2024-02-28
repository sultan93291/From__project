import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
  const numberRegex = /^(\+?88)?01[0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  const [data, setdata] = useState({
    UserName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, Seterror] = useState({
    UserName: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    let newErrors = { ...error };

    if (data.UserName === "") {
      newErrors.UserName = "please enter a user name";
    } else if (!nameRegex.test(data.UserName)) {
      newErrors.UserName = "Invalid name signature";
    } else {
      newErrors.UserName = "";
    }

    if (data.email === "") {
      newErrors.email = "please enter email address";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email signature";
    } else {
      newErrors.email = "";
    }

    if (data.phone === "") {
      newErrors.phone = "please enter phone number";
    } else if (!numberRegex.test(data.phone)) {
      newErrors.phone = "Invalid number signature";
    } else {
      newErrors.phone = "";
    }

    if (data.password === "") {
      newErrors.password = "please enter a password";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password = "Invalid password signature";
    } else {
      newErrors.password = "";
    }

    Seterror(newErrors);
  }, [data]);

  const handleForm = e => {
    let { name, value } = e.target;
    setdata(prevData => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.values(error).every(err => err === "")) {
      alert("Successfully Registered");
      console.log(data);
      setdata({
        UserName: "",
        phone: "",
        email: "",
        password: "",
      });
    } else {
      alert("Invalid Registration Signature");
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} id="form">
          <h1> Register </h1>
          <div className="input__wrapper">
            <input
              type="text"
              name="UserName"
              onChange={handleForm}
              placeholder="enter your name"
              value={data.UserName}
            />
            {error.UserName && <p>{error.UserName}</p>}
            <input
              type="email"
              name="email"
              onChange={handleForm}
              placeholder="enter your email address"
              value={data.email}
            />
            {error.email && <p>{error.email}</p>}
            <input
              type="text"
              name="phone"
              onChange={handleForm}
              placeholder="enter your phone number"
              value={data.phone}
            />
            {error.phone && <p>{error.phone}</p>}
            <input
              type="password"
              name="password"
              onChange={handleForm}
              placeholder="enter your password"
              value={data.password}
            />
            {error.password && <p>{error.password}</p>}
          </div>
          {Object.values(data).every(val => val.trim() !== "") &&
          Object.values(error).every(err => err === "") ? (
            <button type="submit">Register</button>
          ) : (
            <button disabled>disabled</button>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
