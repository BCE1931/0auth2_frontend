import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const emailref = useRef(null);
  const usernameref = useRef(null);
  const pwdref = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailref.current.value;
    const username = usernameref.current.value;
    const pwd = pwdref.current.value;
    const data = {
      email: email,
      password: pwd,
      username: username,
    };
    axios
      .post("https://myserverapp.tech/authentication/register", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "user registered successfully") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refrshtoken", response.data.refreshtoken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("finally blcock is execution");
      });
  };

  return (
    <div>
      {/* GOOGLE LOGIN */}
      <button
        onClick={() => {
          window.location.href =
            "https://myserverapp.tech/oauth2/authorization/google";
        }}
        className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
      >
        Login with Google
      </button>

      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">USERNAME</label>
        <br />
        <input
          type="text"
          ref={usernameref}
          id="username"
          placeholder="enter username"
        />
        <br />
        <br />

        <label htmlFor="email">EMAIL</label>
        <br />
        <input
          type="email"
          ref={emailref}
          id="email"
          placeholder="enter email"
        />
        <br />
        <br />

        <label htmlFor="pwd">PASSWORD</label>
        <br />
        <input
          type="password"
          ref={pwdref}
          id="pwd"
          placeholder="enter password"
        />
        <br />
        <br />

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Register;
