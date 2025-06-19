import express, { Request, Response } from "express";
const router = express.Router();

router.use("/health-check", (req:  Request, res: Response) => {
    console.log("server is running")
    res.send("server is running");
});
export default router;