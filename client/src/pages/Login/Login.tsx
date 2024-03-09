import React, { useState } from "react";
import styles from "./login.module.css";

import logo from "../../../public/assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [role, setRole] = useState("Patient");

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit:", { username, password, hospitalId, role });
    // Add your authentication logic or API calls here
  };

  return (
    <>
      <div className={styles.container}>
		<img className="absolute z-0 opacity-20" src={logo}></img>
        <div className="text-7xl font-extrabold z-10">
          BIO LINK
          <div className="text-5xl font-thin  text-black0">
            your Health records now in safe hands
          </div>
        </div>
        <div className="flex flex-col w-[80%] z-10 justify-between h-[80%] sm:w-[500px] sm:h-[600px] bg-slate-900 rounded p-4">
          <div className="flex justify-center p-4 text-2xl font-bold text-slate-200">
            LOGIN / REGISTER
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 m-4 rounded "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 m-4 rounded "
          />
          <input
            type="text"
            placeholder="Hospital ID"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            className="p-4 m-4 rounded "
          />

          <div className="flex justify-between m-2">
            <button
              className={`px-4 py-2 m-2 w-2/5 ${
                role === "Doctor" ? "bg-red-500" : "bg-slate-200"
              } text-xl font-bold rounded`}
              onClick={() => handleRoleChange("Doctor")}
            >
              Doctor
            </button>

            <button
              className={`px-4 py-2 m-2 w-2/5 ${
                role === "Patient" ? "bg-red-500" : "bg-slate-200"
              } text-xl font-bold rounded`}
              onClick={() => handleRoleChange("Patient")}
            >
              Patient
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="p-4 m-4 bg-lime-300 text-xl font-bold rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
