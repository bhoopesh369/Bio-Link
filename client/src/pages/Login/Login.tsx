import React, { useState } from "react";
import styles from "./login.module.css";

import logo from "../../../public/assets/logo.png";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hospitalId, setHospitalId] = useState("medicalprovider1");
	const [role, setRole] = useState("patient");

	const [intendedAction, setIntendedAction] = useState("login");

	const handleRoleChange = (selectedRole: string) => {
		setRole(selectedRole);
	};

	const apiCall = async () => {
		navigate("/doctors");
		if (!username || !password || !hospitalId || !role) {
			return;
		}
		const response = await fetch(
			BACKEND_URL +
				"/user" +
				`${intendedAction === "login" ? "/login" : "/register"}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
					hospitalId,
					role,
				}),
			}
		);
		if (!response.ok) {
			console.log("Error");
			return;
		}
		const data = await response.json();
		localStorage.setItem("token", data.accessToken);
		navigate("/doctors");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		apiCall();
		e.preventDefault();
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
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-[80%] z-10 justify-between h-[80%] sm:w-[500px] sm:h-[600px] rounded-xl bg-slate-900 p-5"
				>
					<div className="flex justify-center p-4 text-2xl font-extrabold text-slate-200">
						{intendedAction === "login" ? "Login" : "Sign Up"}
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
					<select
						value={hospitalId}
						onChange={(e) => setHospitalId(e.target.value)}
						className="p-4 m-4 rounded"
					>
						<option value="medicalprovider1">Medical Provider 1</option>
						<option value="medicalprovider2">Medical Provider 2</option>
					</select>

					<div className="flex justify-center gap-3 items-center m-2">
						{intendedAction === "signup" ? (
							<button
								className={`px-4 py-2 m-2 w-2/5 ${
									role === "patient" ? "bg-red-500" : "bg-slate-200"
								} text-xl font-bold rounded`}
								onClick={() => handleRoleChange("patient")}
							>
								Patient
							</button>
						) : (
							<>
								<button
									className={`px-4 py-2 m-2 w-2/5 ${
										role === "doctor" ? "bg-red-500" : "bg-slate-200"
									} text-xl font-bold rounded`}
									onClick={() => handleRoleChange("doctor")}
								>
									Doctor
								</button>
								<button
									className={`px-4 py-2 m-2 w-2/5 ${
										role === "patient" ? "bg-red-500" : "bg-slate-200"
									} text-xl font-bold rounded`}
									onClick={() => handleRoleChange("patient")}
								>
									Patient
								</button>
								<button
									className={`px-4 py-2 m-2 w-2/5 ${
										role === "admin" ? "bg-red-500" : "bg-slate-200"
									} text-xl font-bold rounded`}
									onClick={() => handleRoleChange("admin")}
								>
									Admin
								</button>
							</>
						)}
					</div>

					<button
						type="submit"
						className="p-4 m-4 bg-lime-300 text-xl font-bold rounded"
					>
						Submit
					</button>
					{intendedAction === "login" ? (
						<div className="flex justify-center gap-2 p-4 text-2xl font-extrabold text-slate-200">
							Don&apos;t have an account?{" "}
							<span
								className="text-lime-300 cursor-pointer"
								onClick={() => setIntendedAction("signup")}
							>
								Sign Up
							</span>
						</div>
					) : (
						<div className="flex justify-center gap-2 p-4 text-2xl font-extrabold text-slate-200">
							Already have an account?{" "}
							<span
								className="text-lime-300 cursor-pointer"
								onClick={() => setIntendedAction("login")}
							>
								Login
							</span>
						</div>
					)}
				</form>
			</div>
		</>
	);
};

export default Login;
