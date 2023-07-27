const createApp = require('./app');

(async () => {
  const port = process.env.PORT;
  const app = await createApp();

  app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
})();
