import jwt from "jsonwebtoken";
import { refreshTokens } from "./tokenUtils";

// eslint-disable-next-line no-unused-vars
export const getUserByToken = async (token, refreshToken) => {
  try {
    return await jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return null;
  }
};

export const authMiddleware = async (resolve, parent, args, ctx, info) => {
  const { request, SECRET } = ctx;
  let authorization;
  if (request) {
    authorization = request.headers.authorization;
  }
  try {
    ctx.user = await jwt.verify(authorization, SECRET).user;
    return resolve(parent, args, ctx, info);
  } catch (e) {
    return resolve(parent, args, ctx, info);
  }
};
