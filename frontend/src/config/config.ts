const port = process.env.REACT_APP_API_PORT;
const devUrl = `http://localhost:${port}`;
const prodUrl = "https://earthquakedamageforecast.com";

const API_URL =
  process.env.REACT_APP_NODE_ENV === "production" ? prodUrl : devUrl;
console.log("Node env: ", process.env.REACT_APP_NODE_ENV);
console.log("API url: ", API_URL);

const cfg = {
  API_URL,
};

export default cfg;
