import express from "express";
import routes from "./src/routes";
import config from "./config/Environment";
import models from "./src/models";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
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
  .sync({ force: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port} 🚀`);
    });
  })
  .catch((e) => console.log(e));
