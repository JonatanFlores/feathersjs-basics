module.exports = (req, res, next) => {
  const data = res.data; // service call result

  if (data.code) {
    res.status(data.code);
  }

  next();
};
