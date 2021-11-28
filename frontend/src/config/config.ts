const devUrl = "http://localhost:8000";
const prodUrl = "";

const API_URL = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

const cfg = {
  API_URL,
};

export default cfg;
