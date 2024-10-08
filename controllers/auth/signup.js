const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const User = require("../../models/user");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userCheck = await User.findOne({ email });

  if (userCheck) {
    const error = new Error(`User with email ${userCheck} already exist `);
    error.status = 409;
    throw error;
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ name, email, password: hashPassword });

  //-----------Токен при регистрации тоже даем
  const userCurrent = await User.findOne({ email });

  const payload = {
    id: userCurrent._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(userCurrent._id, { token });

  //----------

  //Так - responce - покажет как в базе будет записано:
  //   res.status(201).json(result);

  //Так - свой вариант (что тут писать - зависит от задачи):
  res.status(201).json({
    status: "success",
    code: 201,
    message: "User has just been created",
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
};

module.exports = signup;
