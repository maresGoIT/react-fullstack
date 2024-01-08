import axios from "axios";
import setAxiosDefaults from "./config";

setAxiosDefaults();
async function get() {
  const response = await axios.get("/tutors");

  return response.data;
}

async function create(tutor) {
  const response = await axios.post("/tutors", tutor);

  return response.data;
}

const tutorsService = {
  get,
  create,
};

export default tutorsService;
