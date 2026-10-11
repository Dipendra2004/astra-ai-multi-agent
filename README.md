# AstraAI --- Multi-Agent AI Platform

[![Project
Status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/Dipendra2004/astra-ai-multi-agent)
[![Built with
React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)](https://react.dev/)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)](https://nodejs.org/)

AstraAI is a full-stack AI assistant designed to bring multiple
AI-powered capabilities into one application. It combines a React
frontend with a Node.js/Express microservices backend and uses
LangGraph/LangChain-based orchestration to support specialized AI
workflows.

> **Project status:** AstraAI is an active development and portfolio
> project. Features and setup instructions may evolve as the project
> develops.

## Contents

-   [Highlights](#highlights)
-   [Technology Stack](#technology-stack)
-   [Architecture](#architecture)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Environment Configuration](#environment-configuration)
-   [Running Locally](#running-locally)
-   [Conversation Management](#conversation-management)
-   [AI Workflow](#ai-workflow)
-   [Security Notes](#security-notes)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)

## Highlights

-   AI chat interface with Markdown and code-block rendering
-   Specialized agent workflows, including chat, coding, search, PDF,
    vision, and PPT capabilities (implementation status may vary by
    agent)
-   Conversation creation and selection
-   Conversation history and persistent message storage
-   Delete conversations from the sidebar with a confirmation prompt
-   Backend deletion of a conversation and its associated messages, when
    implemented in the chat controller
-   Redux Toolkit state updates so the sidebar reflects conversation
    deletion immediately
-   API Gateway and separate backend services
-   Firebase authentication and JWT-based authentication middleware
-   MongoDB persistence and Redis-based conversation memory
-   AI model integrations including Groq and Google Gemini; other
    integrations depend on the configured agent implementation

## Technology Stack

  -----------------------------------------------------------------------
  Area                                Technologies
  ----------------------------------- -----------------------------------
  Frontend                            React, Vite, Redux Toolkit,
                                      Tailwind CSS, React Markdown

  Backend                             Node.js, Express.js

  Data                                MongoDB, Mongoose, Redis

  AI orchestration                    LangGraph, LangChain

  AI and search integrations          Groq, Google Gemini, Tavily (as
                                      configured)

  Authentication                      Firebase Authentication, Firebase
                                      Admin SDK, JWT

  Development and deployment          Docker / Docker Compose (where
                                      configured)
  -----------------------------------------------------------------------

## Architecture

At a high level, requests move from the frontend through the API Gateway
to the relevant backend service.

``` text
                       React + Vite Frontend
                                |
                                v
                           API Gateway
                                |
              +-----------------+-----------------+
              |                 |                 |
              v                 v                 v
        Auth Service       Chat Service       Agent Service
              |                 |                 |
              v                 v                 v
       Firebase / JWT      MongoDB          LangGraph workflow
                                |                 |
                                v                 v
                         Message history    Specialized agents
                                |                 |
                                v                 v
                              Redis          Configured AI APIs
```

The exact service responsibilities and integrations depend on the
current implementation and environment configuration.

## Project Structure

The repository is organized around a frontend and separate backend
services. The following is a high-level overview; check the repository
for the exact current file layout.

``` text
AstraAI/
├── frontend/
│   └── src/
│       ├── components/
│       ├── features/
│       └── redux/
└── backend/
    ├── gateway/
    └── services/
        ├── auth/
        ├── chat/
        └── agent/
```

## Getting Started

### Prerequisites

Install the following before running the project:

-   Node.js and npm
-   MongoDB (local or managed)
-   Redis (local or managed, if enabled in your configuration)
-   A Firebase project and service account credentials if using Firebase
    authentication
-   API keys for the AI/search providers used by the agents you want to
    run
-   Docker and Docker Compose if you plan to use the containerized setup

Use the Node.js version supported by the project's package files and
deployment environment.

### 1. Clone the repository

``` bash
git clone https://github.com/Dipendra2004/astra-ai-multi-agent.git
cd astra-ai-multi-agent
```

### 2. Install dependencies

Install dependencies in each service directory that contains a
`package.json`:

``` bash
cd frontend
npm install

cd ../backend/gateway
npm install

cd ../services/auth
npm install

cd ../chat
npm install

cd ../agent
npm install
```

Run each command from the directory shown. If your local repository has
a different service layout, follow the actual directory names.

## Environment Configuration

Create local `.env` files for the services that require them. The
variables below are examples based on the project's documented
configuration; confirm the names used in each service's code before
running it.

### Agent service

``` dotenv
PORT=8003
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
CHAT_SERVICE=http://localhost:8002
REDIS_URL=redis://localhost:6379
```

### Chat service

``` dotenv
PORT=8002
MONGODB_URI=your_mongodb_connection_string
AUTH_SERVICE=http://localhost:8001
```

### Auth service

``` dotenv
PORT=8001
MONGODB_URI=your_mongodb_connection_string
FIREBASE_SERVICE_ACCOUNT_JSON_PATH=./firebase-service-account.json
```

### API Gateway

``` dotenv
PORT=8000
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
```

These are templates, not production-ready values. Add any other
variables required by the current code, such as frontend API URLs, JWT
settings, or payment/storage credentials, if those integrations are
enabled.

## Running Locally

Start MongoDB and Redis if your configuration requires them. Then open a
separate terminal for each service.

### API Gateway

``` bash
cd backend/gateway
npm run dev
```

### Auth service

``` bash
cd backend/services/auth
npm run dev
```

### Chat service

``` bash
cd backend/services/chat
npm run dev
```

### Agent service

``` bash
cd backend/services/agent
npm run dev
```

### Frontend

``` bash
cd frontend
npm run dev
```

The frontend's local URL is shown by Vite in the terminal. Ensure the
frontend API configuration points to the correct gateway URL.

### Docker Compose

If the repository's Compose configuration is complete and the required
environment variables are available, run the command from the directory
containing the Compose file:

``` bash
docker compose up --build
```

Check the actual location of `docker-compose.yml` or `compose.yaml` in
your repository before running this command.

## Conversation Management

AstraAI includes conversation management in the chat interface.

-   **Create:** start a new conversation from the sidebar.
-   **Select:** choose a conversation to view its history.
-   **Persist:** conversation and message data are stored by the backend
    according to the configured database models.
-   **Delete:** use the trash icon beside a conversation and confirm the
    action.
-   **Synchronize:** Redux Toolkit updates the conversation list after a
    successful delete request.

The delete endpoint should verify that the conversation belongs to the
authenticated user and remove associated messages as appropriate. Never
rely on frontend state alone for authorization or data deletion.

## AI Workflow

The intended high-level workflow is:

1.  A user submits a prompt in the frontend.
2.  The request is sent through the API Gateway.
3.  The Agent service routes or processes the request using the
    configured LangGraph workflow.
4.  The selected agent calls the relevant model or integration.
5.  The response is returned to the frontend.
6.  Conversation and message data are persisted according to the service
    implementation.

``` text
User Prompt
    |
    v
React Frontend
    |
    v
API Gateway
    |
    v
Agent Service / LangGraph
    |
    v
Configured Agent and AI Provider
    |
    v
AI Response
    |
    v
Frontend + Conversation Persistence
```

## Security Notes

-   Never commit real API keys, database credentials, Firebase
    service-account files, JWT secrets, or payment credentials.
-   Keep local `.env` files and credential files out of Git using
    `.gitignore`.
-   Provide safe `.env.example` files containing placeholder values, not
    real secrets.
-   Validate requests on the backend.
-   Verify ownership on conversation reads, updates, and deletes.
-   Keep service-to-service authentication and authorization checks on
    the server.
-   Do not expose secret keys in frontend environment variables or
    client-side code.

## Roadmap

The roadmap below is a working list, not a guarantee that every item is
currently implemented.

### Implemented or available in the current project

-   React chat interface
-   API Gateway and microservices structure
-   Authentication flow
-   Conversation creation and selection
-   Message persistence
-   Conversation deletion from the sidebar
-   Redux state synchronization for conversation deletion
-   Markdown and code-block rendering
-   LangGraph workflow and configured chat/model integrations

### Further development

-   Verify and complete all specialized agent workflows
-   Automatic agent routing and richer multi-agent coordination
-   Streaming responses and improved loading states
-   File-upload workflows
-   More consistent error handling and user-facing notifications
-   Request validation and rate limiting
-   Automated tests for APIs and conversation ownership
-   CI/CD, production deployment, logging, and monitoring
-   Screenshots and a demo video

## Contributing

AstraAI is a personal learning and portfolio project. Suggestions, bug
reports, and improvements are welcome. For significant changes, open an
issue or pull request and describe the change and how it was tested.

## License

No open-source license is specified here. Unless a license is added to
the repository, assume that the project is not granted an open-source
license by default.

## Author

**Dipendra Jaiswal**

-   GitHub: [Dipendra2004](https://github.com/Dipendra2004)

------------------------------------------------------------------------

If you encounter setup issues, check the service-specific package
scripts, environment variables, and terminal logs first. Configuration
can differ between local development and deployment.
