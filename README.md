# AstraAI

[![Project status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/Dipendra2004/astra-ai-multi-agent)
[![License](https://img.shields.io/badge/license-UNLICENSED-orange)]

AstraAI is a multi-agent AI assistant built with a React frontend and a Node.js microservices backend. Specialized agents (Chat, Coding, Search, PDF, Vision, PPT, etc.) coordinate via LangGraph to handle different task types.

Note: this README is currently located at frontend/README.md. If the content describes the whole project, consider moving it to the repository root or scope it specifically to the frontend service.

Table of Contents

- Quickstart
- Prerequisites
- Environment (.env) examples
- Running (local and Docker)
- Architecture overview
- Features
- Tech stack
- Authentication / Firebase setup
- Contribution
- Roadmap
- License

Quickstart

Prerequisites

- Node.js 18+ (use nvm or similar)
- npm (or pnpm/yarn)
- MongoDB and Redis (local or managed)
- Firebase project (for authentication) if using auth

Clone the repo

```bash
git clone https://github.com/Dipendra2004/astra-ai-multi-agent.git
cd astra-ai-multi-agent
```

Install dependencies (recommended: separate terminals per service)

Install all services dependencies quickly:

```bash
# frontend
cd frontend && npm install
# gateway
cd ../backend/gateway && npm install
# auth service
cd ../services/auth && npm install
# chat service
cd ../services/chat && npm install
# agent service
cd ../services/agent && npm install
```

Environment (.env) examples

Create a .env file per service. Add a file named `.env.example` in each service directory with the required variables. Example consolidated variables for local development:

Agent service (.env.example)

```
PORT=8003
MONGODB_URI=mongodb://localhost:27017/astra_agent
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
CHAT_SERVICE=http://localhost:8002
REDIS_URL=redis://localhost:6379
```

Chat service (.env.example)

```
PORT=8002
MONGODB_URI=mongodb://localhost:27017/astra_chat
AUTH_SERVICE=http://localhost:8001
```

Auth service (.env.example)

```
PORT=8001
MONGODB_URI=mongodb://localhost:27017/astra_auth
FIREBASE_SERVICE_ACCOUNT_JSON_PATH=./firebase-service-account.json
```

Gateway (.env.example)

```
PORT=8000
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
```

Never commit real API keys, credentials, or service account files. Add them to .gitignore.

Running the project

Run services individually (development):

```bash
# Start gateway
cd backend/gateway && npm run dev
# Start auth service
cd ../services/auth && npm run dev
# Start chat service
cd ../services/chat && npm run dev
# Start agent service
cd ../services/agent && npm run dev
# Start frontend
cd frontend && npm run dev
```

Run with Docker Compose (recommended for local integration):

```bash
# from repo root
docker-compose up --build
```

(Ensure docker-compose.yml is configured and environment variables are provided via .env files or compose secrets.)

Architecture (high level)

- React Frontend → API Gateway → Microservices (Auth, Chat, Agent)
- Agent Service routes requests to specialized agents via LangGraph
- Redis used for fast conversation memory; MongoDB for persistent message storage
- AI models (Groq / Gemini / Tavily) are accessed by agents as needed

(Consider adding a mermaid diagram here for clarity.)

Features

- Multi-agent chat UI with agent selection
- Conversation management and persistent history
- Redis-backed short-term memory + MongoDB persistence
- Firebase + JWT authentication
- Markdown rendering and code blocks
- Initial agents: Chat (implemented), Coding/Search/PDF/Vision/PPT (in progress)

Tech stack

Frontend: React, Vite, Redux Toolkit, Tailwind CSS, React Markdown
Backend: Node.js, Express, Mongoose, Redis
AI / Orchestration: LangGraph, LangChain, Groq, Google Gemini, Tavily
Auth: Firebase Authentication, Firebase Admin SDK, JWT

Authentication / Firebase setup (brief)

1. Create a Firebase project and enable Authentication (email/password or providers).
2. Create a service account and download the JSON file.
3. Place the JSON file in the auth service directory and set FIREBASE_SERVICE_ACCOUNT_JSON_PATH in the auth service .env.
4. Do not commit the JSON file. Add it to .gitignore.

Suggestions / Improvements made (summary)

- Added Table of Contents for easier navigation
- Consolidated and clarified the quickstart and install steps
- Suggested per-service `.env.example` templates and security notes
- Added Docker Compose instruction reminder and a recommended workflow
- Recommended moving project-level README to repo root or scoping this file to the frontend
- Added placeholders for diagrams, screenshots, and examples
- Suggested adding CONTRIBUTING.md, LICENSE, and CODE_OF_CONDUCT files
- Recommended specifying Node and npm versions and adding package.json scripts to run all services (if desired)

Roadmap

Completed:
- Authentication, basic chat interface, message persistence, Gateway

In progress:
- Coding/Search/PDF/Vision/PPT agents, automatic agent routing

Planned:
- Streaming responses, file uploads, improved loading and error handling, automated testing, CI/CD, production deployment

Contributing

This repository is a learning/portfolio project. Contributions, suggestions, and feedback are welcome. Please open an issue or a PR. Consider adding a CONTRIBUTING.md with contribution guidelines and a template for pull requests.

License

Add a LICENSE file at the repo root. If this project is for portfolio/educational purposes only, explicitly state the license (e.g., MIT) or "All rights reserved".

Screenshots / Demos

Add screenshots and demo video links here as the UI stabilizes.

Contact / Author

Dipendra — (link to GitHub profile or contact preferred)

---

If you want, the next step can:
- commit this updated README.md in frontend/
- create .env.example files in each service
- add a root README copy or move this file to the repository root


User Message
     |
     v
MongoDB
     |
     v
Redis
     |
     v
LangGraph
     |
     v
AI Agent
     |
     v
AI Response
     |
     v
Redis + MongoDB


## Authentication

Authentication is handled using Firebase Authentication and Firebase Admin.

The backend also uses JWT-based authentication middleware to protect API routes.

The authentication service is separated from the other backend services as part of the microservices architecture.

## Getting Started
Clone the Repository

git clone https://github.com/Dipendra2004/astra-ai-multi-agent.git
cd astra-ai-multi-agent

## Install Frontend Dependencies
cd frontend
npm install

## Install Backend Dependencies
cd backend/gateway
npm install

cd backend/services/auth
npm install

cd backend/services/chat
npm install

cd backend/services/agent
npm install

## Environment Variables

Create the required .env files for each service.

## Agent Service 
PORT=8003

MONGODB_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key

GOOGLE_API_KEY=your_google_api_key

TAVILY_API_KEY=your_tavily_api_key

CHAT_SERVICE=http://localhost:8002

REDIS_URL=your_redis_url

## Chat Service
PORT=8002


MONGODB_URI=your_mongodb_connection_string
Auth Service
PORT=8001


MONGODB_URI=your_mongodb_connection_string
Gateway
PORT=8000


AUTH_SERVICE=http://localhost:8001


CHAT_SERVICE=http://localhost:8002


AGENT_SERVICE=http://localhost:8003

Never commit real API keys, database credentials, Firebase credentials, or other secrets to the repository.

Running the Project
Start the Gateway
cd backend/gateway
npm run dev
Start the Auth Service
cd backend/services/auth
npm run dev
Start the Chat Service
cd backend/services/chat
npm run dev
Start the Agent Service
cd backend/services/agent
npm run dev
Start the Frontend
cd frontend
npm run dev
AI Agent Workflow

AstraAI uses LangGraph to manage the AI agent workflow.

                    User Prompt
                         |
                         v
                  LangGraph Router
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
        Chat          Coding          Search
          |              |              |
          +--------------+--------------+
                         |
                         v
                    AI Response

Additional agents such as PDF, Vision, and PPT are being developed as part of the project.

Roadmap

The project is currently under active development.

Completed
Authentication
React chat interface
Conversation management
Message persistence
API Gateway
Microservices backend
Redis integration
MongoDB integration
LangGraph workflow
Chat agent
Agent selection
Markdown response rendering
In Progress
Coding agent
Search agent
PDF agent
Vision agent
PPT agent
Automatic agent routing
Planned
Streaming AI responses
File uploads
Better loading states
Better error handling
Request validation
Rate limiting
Automated testing
Docker improvements
CI/CD
Production deployment
Performance optimization
Better logging and monitoring
Screenshots

Screenshots and demo videos will be added as the project progresses.

What I Am Learning From This Project

This project is helping me gain practical experience with:

Full-stack development
MERN architecture
Microservices
API Gateway design
Redis
MongoDB
LangChain
LangGraph
LLM integration
Multi-agent systems
Authentication
State management
Backend service communication
AI application development
Contributing

This is currently a personal learning and portfolio project.

Suggestions and feedback are welcome.

License

This project is currently intended for educational and portfolio purposes.