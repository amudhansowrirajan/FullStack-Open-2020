import axios from "axios";
const baseUrl = "/api/login";

const userLogin = async (userObject) => {
  try {
    const response = await axios.post(baseUrl, userObject);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  userLogin,
};
