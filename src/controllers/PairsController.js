import models from "../models";
import { createOne, findAllFromModel } from "../utils/ModelUtils";

const list = async (where) =>
  await findAllFromModel("Pairs", {
    ...where,
    include: {
      all: true,
    },
  });
const create = async (data) => await createOne("Pairs", data);

const pairsController = {
  create,
  list,
};

export default pairsController;
