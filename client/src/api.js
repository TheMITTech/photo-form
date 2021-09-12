import axios from "axios";
let development = process.env.NODE_ENV !== "production";

let api;

if (development) {
  api = axios.create({
    baseURL: "http://localhost:5000/",
  });
} else {
  api = axios.create({
    baseURL: "https://photo-form.thetech.com",
  });
}

export default api;
