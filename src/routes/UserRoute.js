import { Router } from "express";
import userController from "../controllers/UserController";
import bcrypt from "bcrypt";
import { findOne } from "../utils/ModelUtils";
import { createTokens } from "../utils/tokenUtils";

const router = Router();

router.post("/user", async (req, res) => {
  try {
    const { password, ...body } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    body.password = hashedPassword;
    const usuario = await userController.createUser(body);
    res.status(200).send({
      usuario,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userController.loginUser({ email });
    console.log(user);
    if (!user) {
      res.status(204).send("Usuario o contraseña incorrecta");
    }

    const samePassword = await bcrypt.compare(password, user.password);

    if (!samePassword) {
      res.status(204).send("Usuario o contraseña incorrectos");
    }
    console.log(process.env.SECRET);
    const [token, refreshToken] = await createTokens(
      user,
      process.env.SECRET,
      process.env.SECRET2
    );

    res.status(200).send({
      usuario: user,
      token,
      refreshToken,
    });
  } catch (e) {
    return e;
  }
});

export default router;
