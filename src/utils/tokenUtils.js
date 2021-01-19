import jwt from "jsonwebtoken";
import _ from "lodash";

export const createTokens = async (user, secret, secret2) => {
  console.log(user);
  const createToken = await jwt.sign(
    {
      user: _.pick(user, ["id", "name", "lastname", "email"]),
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
  console.log(createToken);
  const createRefreshToken = await jwt.sign(
    {
      user: _.pick(user, "id", "name", "lastname", "email"),
    },
    secret2,
    {
      expiresIn: "7d",
    }
  );
  console.log(createRefreshToken);
  console.log(createToken, createRefreshToken);
  return [createToken, createRefreshToken];
};

export const createEmailToken = async (user, secret) => {
  // eslint-disable-next-line no-return-await
  return await jwt.sign(
    {
      user: _.pick(user, ["idUser"]),
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
};

export const refreshTokens = async (
  token,
  refreshToken,
  models,
  SECRET,
  SECRET2
) => {
  let userId = 0;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }
  try {
    jwt.verify(refreshToken, SECRET2);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, SECRET2);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};
