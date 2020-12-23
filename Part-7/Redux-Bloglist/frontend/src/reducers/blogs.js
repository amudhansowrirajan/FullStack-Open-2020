import blogService from "../services/blogs";

export const initializeBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    // console.log(blogs);
    dispatch({
      type: "GET_BlOGS",
      data: blogs,
    });
  };
};

export const createBlogAction = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog);
    // console.log(newBlog);
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog,
    });
  };
};

export const commentBlogAction = (blog, comment) => {
  return async (dispatch) => {
    const newBlog = await blogService.commentBlog(blog, comment);
    console.log("action", newBlog);
    dispatch({
      type: "UPDATE_COMMENTS",
      data: newBlog,
    });
  };
};

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(id);

    if (response !== 204) return;
    // response is the status recheck and input the correct status code.

    dispatch({
      type: "DELETE_BLOG",
      data: id,
    });
  };
};

export const likeBlogAction = (blog) => {
  return async (dispatch) => {
    const updatedLikeBlog = await blogService.updateLikes(blog.id, blog);
    dispatch({
      type: "LIKE_BLOG",
      data: updatedLikeBlog,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BlOGS":
      return [...action.data];
    case "CREATE_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    case "LIKE_BLOG":
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    case "UPDATE_COMMENTS":
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    default:
      return state;
  }
};

export default blogReducer;
