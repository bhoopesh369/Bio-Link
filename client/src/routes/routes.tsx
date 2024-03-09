import React from "react";
import "./types.d";
import { Dashboard, Login } from "../pages";

export const publicRoutes: RouteType[] = [
	{
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of Biolink",
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
