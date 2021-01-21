import express from "express";
import routes from "./src/routes";
import config from "./config/Environment";
import models from "./src/models";
import cors from "cors";
import { refreshTokens } from "./src/utils/tokenUtils";
import jwt from "jsonwebtoken";
import cron from "./config/cron";

const verifyToken = async (req, res, next) => {
  console.log(req.headers);
  const authorization = req.headers.authorization;
  const refreshToken = req.headers["x-refresh-token"];
  if (authorization) {
    try {
      const { user } = jwt.verify(authorization, process.env.SECRET);
      req.user = user;
    } catch (e) {
      const newTokens = await refreshTokens(
        authorization,
        refreshToken,
        models,
        process.env.SECRET,
        process.env.SECRET
      );
      // if(newTokens.token && newTokens.refreshToken) {
      //   res.cookie(
      //     'authorization',
      //     newTokens.token,
      //     {
      //       maxAge: 2592000,
      //       httpOnly: true,
      //       sameSite: 'None',
      //       secure: true,
      //     },
      //   );
      //   res.cookie(
      //     'x-refresh-token',
      //     newTokens.refreshToken,
      //     {
      //       maxAge: 2592000,
      //       httpOnly: true,
      //       sameSite: 'None',
      //       secure: true,
      //     },
      //   );
      // }
      req.user = newTokens.user;
    }
    next();
  }
};

const app = express();
app.use(express.json());
app.use(cors());
app.use(verifyToken);
routes(app);
app.use((req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.send({
      error: true,
      message: "Route Not found",
    });
  }
});

models.sequelize
  .sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port} 🚀`);
    });

    cron();
  })
  .catch((e) => console.log(e));
