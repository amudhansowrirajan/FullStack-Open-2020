import axios from "axios";

// const baseURL = "http://localhost:3001/api/persons";
const baseURL = "http://localhost:3001/api/persons";
// const baseURL = "/api/persons" || "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newNote) => {
  const request = axios.post(baseURL, newNote);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => console.log(response));
};

const updatePersons = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  deletePerson,
  updatePersons,
};
