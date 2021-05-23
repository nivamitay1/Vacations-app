const User = require("../models/User");
const sequelize = require("../db/connection");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    await sequelize.sync();

    const [user, created] = await User.findOrCreate({
      where: { email: newUser.email },
      defaults: {
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        password: hashedPassword,
        created_at: new Date().toLocaleString(),
      },
    });
    if (!created) {
      return res
        .status(203)
        .send({ message: "This Email address is taken", success: false });
    }

    res
      .status(201)
      .send({ newUser: user, message: "Account created", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", success: false });
  }
};
exports.checkUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      if (match && data) {
        return res.status(202).send({ success: true, user: user });
      } else {
        return res
          .status(203)
          .send({ success: false, message: "Wrong  password" });
      }
    } else {
      return res
        .status(203)
        .send({ success: false, message: "Wrong email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya" });
  }
};
