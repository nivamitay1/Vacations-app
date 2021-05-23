const Vacation = require("../models/Vacation");
const Follow = require("../models/Follow");
const sequelize = require("../db/connection");
const { Op } = require("sequelize");
const { cloudinary } = require("../utils/cloudinary");

exports.createVacation = async (req, res) => {
  try {
    const newVacation = req.body;
    const fileStr = newVacation.picture;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "vacations",
    });
    await sequelize.sync();

    const [vacation, created] = await Vacation.findOrCreate({
      where: { description: newVacation.description, dates: newVacation.dates },
      defaults: {
        price: newVacation.price,
        picture: uploadResponse.url,
        created_at: new Date().toLocaleString(),
      },
    });

    if (!created) {
      return res
        .status(203)
        .send({ message: "This vacation is already exist", success: false });
    }
    res.status(201).send({ success: true, message: "Vacation created" });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};

exports.getAllVacations = async (req, res) => {
  try {
    const vacations = await Vacation.findAll({
      include: Follow,
    });
    res.status(200).send({ vacations: vacations, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};

exports.updateVcation = async (req, res) => {
  try {
    const newVacationData = req.body;
    const vacationToUpdate = await Vacation.findOne({
      where: { id: req.params.id },
    });

    const fileStr = newVacationData.picture;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "vacations",
    });
    vacationToUpdate.update({
      description: newVacationData.description,
      dates: newVacationData.dates,
      price: newVacationData.price,
      picture: uploadResponse.url,
    });
    res.status(202).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};

exports.deleteVacation = async (req, res) => {
  try {
    const vacation = await Vacation.findOne({ where: { id: req.params.id } });
    cloudinary.uploader.destroy(vacation.picture, {
      upload_preset: "vacations",
    });
    await vacation.destroy();
    res.status(204).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};
exports.filterVacations = async (req, res) => {
  try {
    const filters = JSON.parse(req.params.filters);
    console.log(filters);
    if (filters.destination && filters.dates) {
      const vacations = await Vacation.findAll({
        where: {
          description: { [Op.in]: [filters.destination] },
          dates: { [Op.substring]: [filters.dates] },
        },
        include: Follow,
      });
      console.log(vacations);
      res.status(200).send({ vacations });
    } else if (filters.destination && !filters.dates) {
      const vacations = await Vacation.findAll({
        where: { description: { [Op.substring]: [filters.destination] } },
        include: Follow,
      });
      res.status(200).send({ vacations });
    } else if (!filters.destination && filters.dates) {
      const vacations = await Vacation.findAll({
        where: { dates: { [Op.substring]: [filters.dates] } },
        include: Follow,
      });

      res.status(200).send({ vacations });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("beaya");
  }
};
