const info = (...params) => {
  console.log(...params);
};

const error = () => {
  console.log(...params);
};

module.exports = {
  error,
  info,
};
