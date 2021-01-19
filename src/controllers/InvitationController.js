import { findAllFromModel } from "../utils/ModelUtils";
import models from "../models";

const listFriends = async (idUser) =>
  await findAllFromModel("Exchange", {
    where: {
      idUser,
    },
    include: {
      all: true,
    },
  });

const invitationController = {
  listFriends,
};

export default invitationController;
