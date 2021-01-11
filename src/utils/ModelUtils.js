import models from "../models";

export const createOne = async (model, data, options) => {
  return models[model].create(data, options);
};

export const findOne = async (model, data, options) => {
  return models[model].findOne(data, options);
};

export const createMultipleToAssociate = async (model, data, modelName) => {
  return await Promise.all(
    data.map(async (info) => {
      console.log(info);
      const created = await models[model].create(info);
      return created[`id`];
    })
  );
};

export const getModelById = async (model, id, options) => {
  return await models[model].findByPk(id, options);
};

export const findAndUpdateByPk = async (model, id, fieldsToUpdate, options) => {
  const objectToUpdate = await models[model].findByPk(id, options);
  Object.keys(fieldsToUpdate).forEach((key) => {
    objectToUpdate[key] = fieldsToUpdate[key];
  });
  return await objectToUpdate.save();
};

export const findAllFromModel = async (model, options) => {
  return await models[model].findAll(options);
};

export const findAndCountAllFromModel = async (model, options) => {
  return await models[model].findAndCountAll(options);
};

export const findByPk = async (model, id, options) => {
  return await models[model].findByPk(id, options);
};

export const findLastItem = async (model, options) => {
  return await findByPk(model, await models[model].max(`id`), options);
};

export const countInModel = async (model, where) => {
  return await models[model].count(where);
};

export const findAllFomComposeTable = async (model, where, options) => {
  return await models[model].findAll({
    where,
    ...options,
  });
};

export const findOrCreate = async (model, where, defaults) => {
  return await models[model].findOrCreate({
    where,
    defaults,
  });
};

export const findLastElementOfModel = async (model, options) => {
  return await models[model].findAll({
    limit: 1,
    where: {
      ...options,
    },
    order: [["createdAt", "DESC"]],
  });
};

export const findAllDifferent = async (model, field) => {
  return await models[model].aggregate(field, "DISTINCT", { plain: false });
};
