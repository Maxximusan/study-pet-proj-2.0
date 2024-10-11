const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId, catId } = req.params;
  const isCorrectId = isValidObjectId(contactId || catId);
  if (!isCorrectId) {
    const error = new Error(`${contactId} is not correct id format`);
    error.status = 400;
    // throw error;
    next(error);
  }
  next();
};

module.exports = isValidId;
