# Zoho CRM ↔ Trello Integration

##  Project Idea

This project integrates **Zoho CRM** with **Trello** using public APIs.  
When a Deal in Zoho CRM reaches a specific stage and type, a new Trello Board is automatically created with lists and cards.  
The Trello board ID is then saved back into Zoho CRM to link the two systems.

---

## API Docs for Preview

- Swagger Docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Features

-  Authenticate with Zoho CRM using OAuth2.
-  Generate and store Access Token & Refresh Token in cookies.
-  Poll and filter Zoho Deals by:
  - Stage = `Project Kickoff`
  - Type = `New Implementation Project`
  - Custom field `Project_Board_ID__c` is empty
-  Create Trello Board dynamically for each matching deal.
-  Add 3 default lists to the board: To Do, In Progress, Done.
-  Add 3 default cards to "To Do" list.
-  Update original Zoho Deal with the Trello board ID.
-  Full error handling and rollback logic (delete board if error occurs).
-  Centralized response and error structure.
-  Modular code with Singleton services and environment configuration.
-  Using logger winston to save error in file

---

## What I Have Implemented

- Zoho OAuth2 Authentication
- Access Token & Refresh Token retrieval
- Filtering Zoho Deals
- Trello Board/List/Card creation
- Zoho Deal update with board ID
- Rollback mechanism using `deleteBoard()` if error occurs
- Service structure for Trello and Zoho logic
- Environment-based configuration with `.env`
- Swagger documentation

---

## Project Architecture

```bash
.
├── src
│   ├── controllers
│   │   └── auth.controller.ts       # Handles Zoho auth routes
│   │   └── deal.controller.ts       # Handles Zoho deal routes
│   ├── services
│   │   ├── auth.service.ts          # Zoho aouth API service
│   │   ├── trello.service.ts        # Trello API service
│   │   └── deal.service.ts          # Zoho + Trello integration service
│   ├── middlewares
│   │   └── auth.middleware.ts       # Authentication middleware
│   │   └── error.middleware.ts      # Custom error & warpError handler
│   ├── utils
│   │   ├── response.util.ts         # Standard response builder
│   │   └── customError.util.ts      # Custom error class
│   ├── swaggers
│   │   ├── routes                   # main swagger routes
│   ├── routes
│   │   └── deal.route.ts            # Main route entry
│   ├── types
│   │   └── response.type.ts         # Custom type for API responses
│   ├── config
│   │   └── swagger.config.ts        # Swagger documentation
│   └──
├── app.ts                           # App entry (Express + Swagger)
├── .env
├── package.json
└── README.md

---

##  Technologies Used

- **Language:** TypeScript — for static typing and better developer experience.
- **Backend Framework:** Node.js with Express.js — for building scalable RESTful APIs.
- **Authentication:** Zoho OAuth2 (Authorization Code Flow) — to securely access Zoho CRM data.
- **APIs Used:**
  - Zoho CRM API v8
  - Trello REST API
- **Documentation:** Swagger (via swagger-ui-express) — for API preview and testing.
- **Logging:** Winston — to log errors to files with support for different environments.
- **Environment Management:** dotenv — for handling secrets and environment configs.







