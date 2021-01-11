import { createOne, findOne } from "../utils/ModelUtils";

const createUser = async (data) => await createOne("User", data);
const loginUser = async ({ email }) =>
  await findOne(
    "User",
    {
      email,
    },
    {}
  );

const userController = {
  createUser,
  loginUser,
};

export default userController;
