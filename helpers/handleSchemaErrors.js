const handleSchemaErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

module.exports = handleSchemaErrors;

// универсальна для всех схем