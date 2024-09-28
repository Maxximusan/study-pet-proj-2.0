const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
      // next(несет ошибку в app.js, там обработчик (где 4 параметра)) вместо:
      // res.status(500).json({
      //   status: "error",
      //   code: 500,
      //   message: "Server error "in something of this request" ",
      // });
    }
  };
};

module.exports = controllerWrapper;
