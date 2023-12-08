import professionsJSON from "../mock/professions.json" assert { type: 'json' };
import qualitiesJSON from "../mock/qualities.json" assert { type: 'json' };
import Profession from "../models/Professions.js";
import Quality from "../models/Qualities.js";

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

export const initDatabase = async () => {
  const professions = await Profession.find();
  const qualities = await Quality.find();

  if (professions.length !== professionsJSON.length) {
    createInitialEntity(Profession, professionsJSON);
  }
  if (qualities.length !== qualitiesJSON.length) {
    createInitialEntity(Quality, qualitiesJSON);
  }
};
