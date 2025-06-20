import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zoho CRM Trello Sync API",
      version: "1.0.0",
      description: "Integrate zoho crm with trello",
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
        description: "Local server for development",
      },
    ],
  },
  apis: [
    `./src/swaggers/routes/*.ts`,
    `./src/swaggers/components/*.ts`,
    `./src/swaggers/responses/*.ts`,
    `./src/swaggers/tags/*.ts`,
  ],
};

export const swaggerDoc = (app: Application) => {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
