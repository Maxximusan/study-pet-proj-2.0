const Cat = require("../../models/cats");

const getAllLikedCats = async (request, responce, next) => {
  const { _id } = request.user;
  const favoriteCats = await Cat.find({ owner: _id }).populate("owner");

  responce.json({
    status: "success",
    code: 200,
    favoriteCats,
  });
};

const catAdd = async (request, responce, next) => {
  const { _id } = request.user;
  const cats = await Cat.create({ ...request.body, owner: _id });

  responce.status(201).json({
    status: "success",
    code: 201,
    cats,
  });
};

const removeCat = async (request, responce, next) => {
  const { catId } = request.params;

  const necessaryCat = await Cat.findByIdAndDelete(catId);

  if (!necessaryCat) {
    const error = new Error(`Cat with id=${catId} not found for delete`);
    error.status = 404;
    throw error;
  }

  responce.status(200).json({
    status: "success",
    code: 200,
    message: "cat deleted",
    necessaryCat,
  });
};

module.exports = { getAllLikedCats, catAdd, removeCat };
