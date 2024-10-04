/*
1. Проверяем валидность токена
2. извлекаем из токена id, находим пользователя в базе пл шв и прикрепляем к запросу (req.user)
*/
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

const userVerification = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      const error = new Error("Not authorized type of token");
      error.status = 401;
      throw error;
    }

    const { id } = jwt.verify(token, SECRET_KEY); //тут вылетает ошибка - поэтому try\catch
    const user = await User.findById(id);

    //дописуем для логаута - !user.token
    if (!user || !user.token) {
      const error = new Error("Not authorized user");
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = userVerification;
