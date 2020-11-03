import axios from "axios";

const baseURL = "http://localhost:3001/api/notes";

const getAll = () => {
  const request = axios.get(baseURL);
  const nonServerNote = {
    content: "Not in Server",
    date: "2020-10-26T07:14:24.433Z",
    important: false,
    id: 10000,
  };
  return request.then((response) => response.data.concat(nonServerNote));
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
// we can do this when the names of the keys and the values are the same.
