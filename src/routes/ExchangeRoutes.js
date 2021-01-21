import { Router } from "express";
import { createMultipleToAssociate, createOne } from "../utils/ModelUtils";
import shortid from "shortid";
import exchangeController from "../controllers/ExchangeController";
import { sendEmails } from "../utils/email";

const router = Router();

router.post("/exchange", async (req, res) => {
  try {
    const {
      user: { id: idUser, name: userName, email },
    } = req;
    const {
      name,
      date,
      reservationLimit,
      budget,
      observations,
      category,
      invitations: { names, emails },
    } = req.body;
    console.log(req.user);
    const key = shortid.generate();
    const exchange = await exchangeController.create({
      name,
      date,
      reservationLimit,
      budget,
      observations,
      key,
      idUser,
    });
    const rightInvitations = [];
    names.forEach((name, index) => {
      if (name !== "") {
        rightInvitations.push({
          name,
          email: emails[index],
        });
      }
    });
    rightInvitations.push({
      name: userName,
      email,
      confirmed: true,
    });
    const associateInvitations = await createMultipleToAssociate(
      "Invitation",
      rightInvitations
    );
    await exchange.setInvitations(associateInvitations);
    await exchange.setCategories(category);
    const invites = rightInvitations.map((invite) => invite.email);
    await sendEmails(invites, exchange.key);
    res.status(200).send({
      exchange,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/exchange", async (req, res) => {
  try {
    const {
      user: { id: idUser },
    } = req;
    const exchanges = await exchangeController.list(idUser);
    res.status(200).send({
      exchanges,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/exchange/:id", async (req, res) => {
  try {
    const {
      user: { id: idUser },
    } = req;
    const { id } = req.params;
    const exchange = await exchangeController.get(id, {
      include: {
        all: true,
      },
    });
    res.status(200).send({
      exchange,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/delete/exchange/:id", async (req, res) => {
  try {
    const {
      user: { id: idUser },
    } = req;
    const { id } = req.params;
    await exchangeController.deleteBy(id);
    res.status(200).send({
      deleted: true,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
