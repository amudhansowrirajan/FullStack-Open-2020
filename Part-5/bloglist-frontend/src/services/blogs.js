import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  // console.log(token);
};

const createBlog = async (blogObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(baseUrl, blogObject, config);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const updateLikes = async (id, blogObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.status;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export default { getAll, setToken, createBlog, updateLikes, deleteBlog };
