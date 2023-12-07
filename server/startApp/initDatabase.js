const professionsJSON = require("../mock/professions.json");
const qualitiesJSON = require("../mock/qualities.json");
const Profession = require("../models/Professions.js");
const Quality = require("../models/Qualities.js");

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;

        const newItem = new Model(item);

        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
};

module.exports = async () => {
  const professions = await Profession.find();
  const qualities = await Quality.find();

  if (professions.length !== professionsJSON.length) {
    createInitialEntity(Profession, professionsJSON);
  }
  if (qualities.length !== qualitiesJSON.length) {
    createInitialEntity(Quality, qualitiesJSON);
  }
};
