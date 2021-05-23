const Vacation = require("../models/Vacation");
const Follow = require("../models/Follow");
const sequelize = require("../db/connection");
const { Op } = require("sequelize");

exports.createFollow = async (req, res) => {
  try {
    const { userID, vacationID } = req.body;

    await sequelize.sync();

    const [follow, created] = await Follow.findOrCreate({
      where: { user_id: userID, vacation_id: vacationID },
      defaults: {
        created_at: new Date().toLocaleString(),
      },
    });
    if (!created) {
      await follow.destroy();
      return res.status(203).send({ created: false });
    }
    res.status(201).send({ created: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};
exports.getVacationsWithFollowers = async (req, res) => {
  try {
    const vacationsWithFollowers = [];
    const vacations = await Vacation.findAll({
      attributes: ["description"],
      include: { model: Follow },
    });
    vacations.forEach((vacation) => {
      if (vacation.follows.length > 0) {
        vacationsWithFollowers.push(vacation);
      }
    });
    res.status(200).send({ vacations: vacationsWithFollowers, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};
exports.getUsersVacations = async (req, res) => {
  try {
    const userID = req.params.id;
    const followedVacationsID = [];
    const followedVacations = await Follow.findAll({
      where: { user_id: userID },
      include: { model: Vacation, include: Follow },
    });
    followedVacations.forEach((item) => {
      console.log(item.vacation);
      item.vacation.dataValues.isFollowed = true;
      followedVacationsID.push(item.vacation_id);
    });
    const restOfVacations = await Vacation.findAll({
      where: {
        id: { [Op.notIn]: followedVacationsID },
      },
      include: Follow,
    });
    console.log(followedVacations);
    const vacations = [...followedVacations, ...restOfVacations];
    res.status(200).send({ vacations: vacations, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};
