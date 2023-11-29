import axios from "axios";

axios.defaults.baseURL = "http://hn.algolia.com/api/v13/";

async function retrieveArticles() {
  const response = await axios.get("/search?query=react");

  return response.data.hits;
}

const newsService = {
  retrieveArticles,
};

export default newsService;
