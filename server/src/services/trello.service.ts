import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { ResponseOptions } from "../types/response.type";
import { HandleError } from "../middlewares/error.middleware";
import { CustomError } from "../utils/customError.util";
const { warpError } = HandleError.getInstance();
const { TRELLO_API_BASE, API_KEY, TOKEN } = process.env;

export class TrelloService {
  private static instance: TrelloService;
  private constructor() {}
  public static getInstance(): TrelloService {
    if (!TrelloService.instance) {
      TrelloService.instance = new TrelloService();
    }
    return TrelloService.instance;
  }

  private handleError = (response: any, action: string) => {
    if (response.data.error)
      throw new CustomError("BadRequest", 400, false, response.data.error);
    return serviceResponse({
      statusText: "OK",
      message: `${action} created successfully`,
      data: response.data.id,
    });
  };

  createBoard = warpError(
    async (dealName: string): Promise<ResponseOptions> => {
      const response = await axios.post(`${TRELLO_API_BASE}/boards/`, null, {
        params: {
          name: `Project: ${dealName}`,
          key: API_KEY,
          token: TOKEN,
        },
      });
      return this.handleError(response, "list");
    }
  );

  createList = warpError(
    async (idBoard: string, name: string): Promise<ResponseOptions> => {
      const response = await axios.post(`${TRELLO_API_BASE}/lists/`, null, {
        params: {
          name,
          idBoard,
          key: API_KEY,
          token: TOKEN,
        },
      });
      return this.handleError(response, "list");
    }
  );

  createCard = warpError(
    async (listId: string, name: string): Promise<ResponseOptions> => {
      const response = await axios.post(`${TRELLO_API_BASE}/cards/`, null, {
        params: {
          idList: listId,
          name,
          key: API_KEY,
          token: TOKEN,
        },
      });
      return this.handleError(response, "card");
    }
  );

  deleteBoard = warpError(async (boardId: string): Promise<void> => {
    await axios.delete(`${TRELLO_API_BASE}/boards/${boardId}`, {
      params: {
        key: API_KEY,
        token: TOKEN,
      },
    });
  });
}
