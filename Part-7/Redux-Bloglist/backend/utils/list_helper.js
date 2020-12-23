const blogvar = require("../tests/blogs");
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) {
    return null;
  }

  return blogs.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  if (!Array.isArray(blogs)) {
    return null;
  } else if (!blogs.length > 0) {
    return 0;
  }
  const largest = Math.max(...blogs.map((x) => x.likes));
  const favourites = blogs.filter((blog) => blog.likes >= largest);
  return favourites[0];
};

const mostBlogs = (blogs) => {
  // author  frequency and authors - unique list
  const authorList = blogs.map((blog) => blog.author);
  const modeAuthor = _.countBy(authorList);
  const uniqueList = [...new Set(authorList)];
  // finding max number of blogs written and the author of max number of blogs
  const maxOf = [];
  for (let i = 0; i < uniqueList.length; i++) {
    maxOf.push(modeAuthor[uniqueList[i]]);
  }
  const maxValue = Math.max(...maxOf);
  let maxAuthor = "";
  for (let i = 0; i < uniqueList.length; i++) {
    modeAuthor[uniqueList[i]] === maxValue ? (maxAuthor = uniqueList[i]) : null;
  }
  // create and return a new object
  return {
    author: maxAuthor,
    likes: maxValue,
  };
};

const mostLikes = (blogs) => {
  // create  unique author List
  const uniqueAuthorList = [
    ...new Set(
      blogs.map((blog) => {
        return blog.author;
      })
    ),
  ];
  // find the total likes for each author
  const likesArray = [];
  for (let i = 0; i < uniqueAuthorList.length; i++) {
    const likes = blogs
      .filter((blog) => blog.author === uniqueAuthorList[i])
      .map((blog) => blog.likes)
      .reduce((acc, cur) => {
        return acc + cur;
      });

    const totalLikesPerAuthor = {
      author: uniqueAuthorList[i],
      likes: likes,
    };
    likesArray.push(totalLikesPerAuthor);
  }
  //  find max likes and author with the most likes.
  const maxLikes = Math.max(...likesArray.map((author) => author.likes));
  const authorsMaxLikes = likesArray.filter(
    (author) => author.likes === maxLikes
  );

  const answer = {
    author: authorsMaxLikes[0].author,
    likes: maxLikes,
  };
  console.log(answer);
  return answer;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
