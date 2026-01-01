import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Middle = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const refreshtoken = params.get("refreshtoken");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("token : ", token);

    localStorage.setItem("refreshtoken", refreshtoken);
    console.log("refresh token : ", refreshtoken);
    navigate("/home");
  }, []);
  return (
    <div>
      <p>home </p>
      <p>{token}</p>
    </div>
  );
};

export default Middle;
