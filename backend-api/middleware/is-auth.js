module.exports = (req, res, next) => {
  if (req.get("Authorization") !== process.env.MONGO_PASSWORD) {
    const error = new Error("Not authorized to add words!");
    error.httpStatusCode = 401;
    throw error;
  }
  next();
};
