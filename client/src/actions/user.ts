import { LOGIN } from "./types";

export const loginSuccess = (data: { name: string; userToken: string }) => {
	return {
		type: LOGIN,
		payload: data,
	};
};
