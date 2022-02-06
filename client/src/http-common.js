import axios from "axios";

export default axios.create({
  baseURL: "https://fastify-restapi-crud.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});