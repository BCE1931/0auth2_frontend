import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const [userinfo, setuserinfo] = useState({});
  const emailref = useRef(null);
  const usernameref = useRef(null);
  const pwdref = useRef(null);
  useEffect(() => {
    const google = () => {
      axios
        .get(`https://myserverapp.tech/api/v1/getuserinfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setuserinfo(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          console.log("finally execution");
        });
      //   axios
      //     .get("http://localhost:8081/api/v1/hi")
      //     .then((resp) => console.log(resp.data))
      //     .catch((err) => console.log(err));
    };
    google();
  }, []);

  useEffect(() => {
    if (userinfo.logintype === "google" && emailref.current) {
      emailref.current.value = userinfo.email;
      usernameref.current.value = userinfo.username;
    }
  }, [userinfo]);

  const updatedetails = (e) => {
    e.preventDefault();
    if (!pwdref.current.value.trim()) {
      alert("Password can't be empty");
      return;
    }

    axios
      .put(
        "https://myserverapp.tech/api/v1/updatedetails",
        {
          email: emailref.current.value,
          username: usernameref.current.value,
          password: pwdref.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.status === 202) {
          console.log("pwd updated successfully");
        } else if (resp.status === 404) {
          console.log("email not found");
        } else if (resp.status === 304) {
          console.log("user already has an pwd");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>this is main users page after login</p>
      {userinfo.logintype === "google" ? (
        <div>
          <p>hey you need to update password</p>
          <form onSubmit={updatedetails}>
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
              readOnly
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
      ) : (
        <div>
          <p className="mb-4 text-gray-600">Hey, no need to update password</p>

          <div className="flex flex-col gap-3 max-w-sm">
            <Link
              to="/add"
              className="block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              ➕ Add page
            </Link>

            <Link
              to="/all"
              className="block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              📦 View all products
            </Link>

            <Link
              to="/update"
              className="block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              ✏️ Update page
            </Link>
            <Link
              to="/intro"
              className="block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              👉 Delete page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
