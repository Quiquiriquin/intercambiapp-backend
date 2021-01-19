import { findAllFromModel } from "../utils/ModelUtils";

const list = async () => await findAllFromModel("Category", {});

const categoryController = {
  list,
};

export default categoryController;
