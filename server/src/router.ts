import express, { Request, Response } from "express";
import AuthRoutes from "./routes/auth.route";
import DealRoutes from "./routes/deal.route";
const router = express.Router();

router.use("/health-check", (req: Request, res: Response) => {
  console.log("server is running");
  res.send("server is running");
});

router.use("/auth", AuthRoutes);
router.use("/deals", DealRoutes);

export default router;
