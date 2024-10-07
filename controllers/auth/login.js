const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const User = require("../../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`User with this email - not found `);
    error.status = 401;
    throw error;
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    const error = new Error(`Wrong password`);
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token }); //записываем токен в базу (для логаута).
  // console.log(user.name);
  // console.log(user.email);

  res.json({
    status: "success",
    code: 200,

    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = login;
