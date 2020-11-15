const favouriteBlog = require("../utils/list_helper").favouriteBlog;
const helper = require("./blogs");

const favourite = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0,
};

describe("favourite Blog test", () => {
  test("first of the highest favourited blogs", () => {
    expect(favouriteBlog(helper.blogs)).toEqual(favourite);
  });

  test(" is the result an Object", () => {
    expect(Object.prototype.toString.call(favouriteBlog(helper.blogs))).toEqual(
      "[object Object]"
    );
  });

  test("return zero for an empty array", () => {
    expect(favouriteBlog([])).toBe(0);
  });

  test("return null for a non array arguement", () => {
    expect(favouriteBlog({ hello: "hello" })).toBe(null);
  });
});
