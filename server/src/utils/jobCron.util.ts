import cron from "node-cron";
import { logger } from "../configs/winston.config";
import { DealService } from "../services/deal.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
const { createNewAccessToken } = AuthMiddleware.getInstance();
const { ZOHO_REFRESH_TOKEN } = process.env;

export const jobCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const accessToken = await createNewAccessToken(
        String(ZOHO_REFRESH_TOKEN)
      );
      const service = DealService.getInstance();

      await service.filterDeals(accessToken, {
        stage: "Project Kickoff",
        type: "New Implementation Project",
      });

      console.log("[CRON] Sync completed.");
    } catch (err: any) {
      logger.error(`${err.message}\n${err.stack}`);
    }
  });
};
