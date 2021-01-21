import { Router } from "express";
import pairsController from "../controllers/PairsController";

const router = Router();

router.get("/pairs/:id", async (req, res) => {
  try {
    const { id: idExchange } = req.params;
    const pairs = await pairsController.list({
      where: {
        idExchange,
      },
    });
    res.status(200).send({
      pairs,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/pairs", async (req, res) => {
  try {
    const body = req.body;
    const pair = await pairsController.create(body);
    res.status(200).send({
      pair,
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
