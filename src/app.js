import "@babel/polyfill";
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from '../swagger.json';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

// Swagger ui documentation
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${PORT}`);
});

export default app;