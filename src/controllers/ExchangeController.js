import {
  createOne,
  findAllFromModel,
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
const exchangeController = {
  list,
  create,
  get,
};

export default exchangeController;
