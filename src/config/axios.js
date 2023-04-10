import axios from "axios";
import { server } from "./keys";
export const getToken = () => {
  const tokenData = localStorage.getItem("adminToken")
    ? localStorage.getItem("adminToken")
    : "";
  return tokenData;
};

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const adminInstance = () =>
  axios.create({
    baseURL: `${server}/v1/admin/auth`,
    headers: { Authorization: getAuthorizationHeader() },
  });
export const adminAuthInstance = () =>
  axios.create({
    baseURL: `${server}/v1/admin/auth`,
  });

export const pokerTournamentInstance = () =>
  axios.create({
    baseURL: `${server}/v1/poker/tournament`,
  });
