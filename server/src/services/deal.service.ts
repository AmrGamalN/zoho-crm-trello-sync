import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { ResponseOptions } from "../types/response.type";
import { TrelloService } from "../services/trello.service";
import { HandleError } from "../middlewares/error.middleware";
const { warpError } = HandleError.getInstance();
const { ZOHO_API_BASE } = process.env;

export class DealService {
  private static instance: DealService;
  private trelloService: TrelloService;
  private constructor() {
    this.trelloService = TrelloService.getInstance();
  }
  public static getInstance(): DealService {
    if (!DealService.instance) {
      DealService.instance = new DealService();
    }
    return DealService.instance;
  }

  filterDeals = warpError(
    async (
      accessToken: string,
      body: { stage: string; type: string }
    ): Promise<ResponseOptions> => {
      console.log("Received new deal from Zoho:");
      const encodedCriteria = encodeURIComponent(
        `((Stage:equals:${body.stage}) and (Type:equals:${body.type}) and (Project_Board_ID_c:equals:null))`
      );
      const response = await axios.get(
        `${ZOHO_API_BASE}/Deals/search?criteria=${encodedCriteria}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
        }
      );

      const deals = response?.data?.data;
      if (!deals?.length)
        return serviceResponse({
          statusText: "NotFound",
          message: "No matching deals found",
        });

      await this.createBoard(deals, accessToken);
      return serviceResponse({
        statusText: "OK",
        message: "Trello boards created and linked to Zoho deals successfully.",
      });
    }
  );

  private createBoard = async (
    deals: any,
    accessToken: string
  ): Promise<ResponseOptions | void> => {
    for (const deal of deals) {
      let boardId: string | null = null;
      try {
        // create trello board
        const board = await this.trelloService.createBoard(deal.Deal_Name);
        boardId = board?.data;

        // create trello lists
        const [todoList] = await Promise.all([
          this.trelloService.createList(boardId, "To Do"),
          this.trelloService.createList(boardId, "In Progress"),
          this.trelloService.createList(boardId, "Done"),
        ]);

        // create trello cards
        const listId = todoList?.data;
        await Promise.all([
          this.trelloService.createCard(
            todoList?.data,
            "Kickoff Meeting Scheduled"
          ),
          this.trelloService.createCard(listId, "Requirements Gathering"),
          this.trelloService.createCard(listId, "System Setup"),
        ]);

        await this.updateDeal(accessToken, deal.id, String(boardId));
      } catch (err: any) {
        await this.trelloService.deleteBoard(boardId);
        return serviceResponse({
          statusText: "BadRequest",
          message: err.message ?? "Error in creating trello board",
        });
      }
    }
  };

  private updateDeal = async (
    accessToken: string,
    dealId: string,
    boardId: string
  ): Promise<void> => {
    await axios.put(
      `${ZOHO_API_BASE}/Deals`,
      {
        data: [
          {
            id: dealId,
            Project_Board_ID_c: boardId,
          },
        ],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );
  };
}
