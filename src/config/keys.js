import config from "./config.json";
const configData = config[process.env.REACT_APP_ENV];
export const { server, admin } = configData;