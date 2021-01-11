import userRoutes from "./routes/UserRoute";

export default (app) => {
  app.use("/api/v1/", userRoutes);
  // app.get("/api/v1/recipe", recipeController.getRecipes);
};
