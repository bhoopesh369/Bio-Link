import React from "react";
import { privateRoutes, publicRoutes } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages";
import { MetaDecoratedPage } from "../components";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{publicRoutes.map((route) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								<MetaDecoratedPage
									title={route.title}
									description={route.description}
									element={route.element}
								/>
							}
						/>
					);
				})}
				{privateRoutes.map((route) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								<MetaDecoratedPage
									title={route.title}
									description={route.description}
									element={route.element}
								/>
							}
						/>
					);
				})}
				<Route
					path="*"
					element={
						<MetaDecoratedPage
							title="Not Found"
							description="This is the not found page of Biolink"
							element={<NotFoundPage />}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
