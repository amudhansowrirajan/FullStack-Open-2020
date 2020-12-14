import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAnecdote = async (text) => {
  const object = { content: text, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const updateAncedote = async (object) => {
  const response = await axios.put(`${baseURL}/${object.id}`, object);
  return response.data;
};
export default {
  getAll,
  createAnecdote,
  updateAncedote,
};
