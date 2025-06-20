import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { HandleError } from "./src/middlewares/error.middleware";
const { errorMiddleware } = HandleError.getInstance();
import dotenv from "dotenv";
import { swaggerDoc } from "./src/config/swagger.config";
import router from "./src/router";
import { mongodbConnect } from "./src/config/mongodb.config";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

swaggerDoc(app);
app.use("/api/v1", router);

Promise.all([mongodbConnect()])
  .then(() => {
    app.use((req: Request, res: Response) => {
      res.status(404).json({ message: "Page not found" });
    });
    app.use(errorMiddleware());
    app.listen(PORT, () => {
      console.log(
        `
        Server is running on port ${PORT}
        Swagger is running on: http://localhost:${PORT}/api-docs
        `
      );
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
