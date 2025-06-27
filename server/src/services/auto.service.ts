import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { ResponseOptions } from "../types/response.type";
import { TrelloService } from "./trello.service";
import { HandleError } from "../middlewares/error.middleware";
const { warpError } = HandleError.getInstance();
const { ZOHO_API_BASE, ZOHO_ACCESS_TOKEN } = process.env;

export class AutoService {
  private static instance: AutoService;
  private trelloService: TrelloService;
  private constructor() {
    this.trelloService = TrelloService.getInstance();
  }
  public static getInstance(): AutoService {
    if (!AutoService.instance) {
      AutoService.instance = new AutoService();
    }
    return AutoService.instance;
  }

  createBoard = warpError(async (body: any): Promise<ResponseOptions> => {
    const board = await this.trelloService.createBoard(body.deal_name);
    const boardId = board?.data;

    const [todoList] = await Promise.all([
      this.trelloService.createList(boardId, "To Do"),
      this.trelloService.createList(boardId, "In Progress"),
      this.trelloService.createList(boardId, "Done"),
    ]);

    const listId = todoList?.data;
    await Promise.all([
      this.trelloService.createCard(
        todoList?.data,
        "Kickoff Meeting Scheduled"
      ),
      this.trelloService.createCard(listId, "Requirements Gathering"),
      this.trelloService.createCard(listId, "System Setup"),
    ]);

    await this.updateDeal(
      String(ZOHO_ACCESS_TOKEN),
      body.deal_id,
      String(boardId)
    );
    return serviceResponse({
      statusText: "OK",
      message: "Trello boards created and linked to Zoho deals successfully.",
    });
  });

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
