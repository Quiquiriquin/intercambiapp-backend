import { Router } from "express";
import invitationController from "../controllers/InvitationController";

const router = Router();

router.get("/friends/:idUser", async (req, res) => {
  try {
    // const { user: { id: idUser } } = req;
    const { idUser: idUserParams } = req.params;
    const exchanges = await invitationController.listFriends(idUserParams);
    const invitations = [];
    const categories = [];
    console.log(exchanges);
    exchanges.forEach((exc, index) => {
      exc.Invitations.forEach((inv) => {
        if (invitations.findIndex((elem) => elem.email === inv.email) === -1) {
          invitations.push({
            ...inv.dataValues,
          });
        }
      });
      exc.Categories.forEach((cat, index) => {
        if (!categories.includes(cat.name)) {
          categories.push(cat.name);
        }
      });
      // exc.Category.forEach((inv) => {
      //   if (!invitations.includes(inv.email)) {
      //     invitations.push({
      //       ...inv.dataValues
      //     });
      //   }
      // });
    });
    res.status(200).send({
      invitations,
      categories,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
