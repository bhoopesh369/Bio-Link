import axios from "axios";
import { BACKEND_URL } from "../../config";
/* eslint-disable*/
export const axiosInstance = axios.create({
	baseURL: BACKEND_URL,
	withCredentials: true,
});
(axiosInstance.defaults.headers as any).Authorization =
	"Bearer " + localStorage.getItem("token");
