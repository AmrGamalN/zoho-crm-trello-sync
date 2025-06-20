import express, { Request, Response } from "express";
const router = express.Router();
import AuthRoutes from "./routes/auth.route";

router.use("/health-check", (req: Request, res: Response) => {
  console.log("server is running");
  res.send("server is running");
});

router.use("/auth", AuthRoutes);

export default router;
