const bcrypt = require("bcryptjs");

const User = require("../../models/user");

const singup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const error = new Error(`User with email ${user} already exist `);
    error.status = 409;
    throw error;
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });

  //Так responce - покажет как в базе будет записано:
  //   res.status(201).json(result);

  //Так - свой вариант:
  res.status(201).json({
    // что тут писать - зависит от задачи
    status: "success",
    code: 201,
    message: "User has just been created",
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = singup;
