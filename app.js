import express from 'express';
import routes from './src/routes';
import config from './config/Environment';

const app = express();
app.use(express.json());

routes(app);
app.use((req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.send({
      error: true,
      message: 'Route Not found',
    });
  }
});

app.listen(config.port, () => {
  console.log(`app is listening on port ${config.port}`);
});
