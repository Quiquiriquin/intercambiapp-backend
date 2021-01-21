import {
  createOne,
  deleteModel,
  findAllFromModel,
  findAndUpdateByPk,
  findByPk,
  findOne,
} from "../utils/ModelUtils";

const list = async (idUser) =>
  await findAllFromModel("Exchange", {
    where: {
      idUser,
    },
  });
const create = async (data) => await createOne("Exchange", data, {});
const get = async (id, options) => await findByPk("Exchange", id, options);
const deleteBy = async (id) => await deleteModel("Exchange", id);
const listAll = async (where) =>
  await findAllFromModel("Exchange", {
    include: {
      all: true,
    },
    ...where,
  });

const update = async (id, data) =>
  await findAndUpdateByPk("Exchange", id, data, {});
const exchangeController = {
  list,
  create,
  get,
  deleteBy,
  listAll,
  update,
};

export default exchangeController;
