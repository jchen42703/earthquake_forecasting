const port = process.env.REACT_APP_API_PORT;
const devUrl = `http://localhost:${port}`;
const prodUrl = "";

console.log("dev url: ", devUrl);
const API_URL = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

const cfg = {
  API_URL,
};

export default cfg;
