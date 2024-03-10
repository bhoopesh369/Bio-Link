import React from "react";
import "./types.d";
import { Dashboard, Login, Doctor } from "../pages";
import Patients from "../pages/Patients/Patients";

export const publicRoutes: RouteType[] = [
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of Biolink",
	},

	{
		path: "/doctors",
		element: <Doctor />,
		title: "Doctors",
		description: "Doctors Page of Biolink",
	},

	{
		path: "/patients",
		element: <Patients />,
		title: "Doctors",
		description: "Doctors Page of Biolink",
	},
];

export const privateRoutes: RouteType[] = [
	{
		path: "/",
		element: <Dashboard />,
		title: "Dashboard",
		description: "Dashboard Page of Biolink",
	},


];
