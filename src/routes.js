import userRoutes from "./routes/UserRoute";
import categoryRoutes from "./routes/CategoryRoute";
import exchangeRoutes from "./routes/ExchangeRoutes";
import invitationRoutes from "./routes/InvitationRoutes";

export default (app) => {
  app.use("/api/v1/", userRoutes);
  app.use("/api/v1/", categoryRoutes);
  app.use("/api/v1/", exchangeRoutes);
  app.use("/api/v1/", invitationRoutes);
  // app.get("/api/v1/recipe", recipeController.getRecipes);
};
