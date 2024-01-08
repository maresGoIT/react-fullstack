import axios from "axios";
import setAxiosDefaults from "./config";

setAxiosDefaults();
async function retrieveArticles() {
  const response = await axios.get("/search?query=react");

  return response.data.hits;
}

const newsService = {
  retrieveArticles,
};

export default newsService;
