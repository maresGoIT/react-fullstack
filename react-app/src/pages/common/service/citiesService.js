import axios from "axios";
import setAxiosDefaults from "./config";

setAxiosDefaults();
async function get() {
  const response = await axios.get("/cities");

  return response.data;
}

async function create(city) {
  const response = await axios.post("/cities", city);

  return response.data;
}

async function remove(cityId) {
  const response = await axios.delete(`/cities/${cityId}`);

  return response.data;
}

async function update(city) {
  const response = await axios.put(`/cities/${city.id}`, city);

  return response.data;
}

const citiesService = {
  get,
  create,
  remove,
  update,
};

export default citiesService;
