import { Router } from "express";
import userController from "../controllers/UserController";
import bcrypt from "bcrypt";
import { findOne } from "../utils/ModelUtils";
import categoryController from "../controllers/CategoryController";
import exchangeController from "../controllers/ExchangeController";

const router = Router();

router.get("/category", async (req, res) => {
  try {
    const categories = await categoryController.list();
    console.log(categories);
    res.status(200).send({
      categories,
    });
  } catch (e) {
    res.send(e);
  }
});

router.get("/favorite/category/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const exchanges = await exchangeController.list(idUser);
    console.log(exchanges);
    res.status(200).send({
      exchanges,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
