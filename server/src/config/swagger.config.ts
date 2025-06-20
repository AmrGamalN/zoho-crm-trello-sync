import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zoho CRM API",
      version: "1.0.0",
      description: "Integrate zoho crm with trello",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: [
    `./src/routes/*.ts`,
    `./src/swagger/components/*.ts`,
    `./src/swagger/responses/*.ts`,
    `./src/swagger/tags/*.ts`,
  ],
};

export const swaggerDoc = (app: Application) => {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
