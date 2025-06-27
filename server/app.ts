import { HandleError } from "./src/middlewares/error.middleware";
import { swaggerDoc } from "./src/configs/swagger.config";
import express, { Request, Response } from "express";
import { jobCron } from "./src/utils/jobCron.util";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./src/router";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

const { errorMiddleware } = HandleError.getInstance();
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  swaggerDoc(app);
}
app.use("/api/v1", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "route not found" });
});


app.use(errorMiddleware());
app.listen(PORT, () => {
  console.log(
    `
     Server is running on port ${PORT}
     Swagger is running on: http://localhost:${PORT}/api-docs
    `
  );
  // jobCron();
});
