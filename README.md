# 🍽️ Restaurant AI Assistant

An AI-powered Restaurant Assistant that helps users get information about restaurant menus through natural language conversations. Built using **React, Spring Boot, PostgreSQL, and OpenAI API**, the application uses an intelligent AI agent to understand user queries, retrieve relevant information from the database, and generate accurate responses.

## 🚀 Features

- 🤖 **AI-Powered Chatbot:** Interact with the restaurant assistant using natural language.
- 🧠 **Intelligent AI Agent:** Understands user queries and determines what information is needed.
- 🗄️ **PostgreSQL Database:** Stores restaurant menu items and related information.
- 🔍 **Database Retrieval:** Fetches relevant menu information based on user questions.
- 💬 **Smart Responses:** Uses OpenAI API to generate human-friendly answers.
- ⚡ **Full-Stack Application:** React frontend with Spring Boot backend.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Spring Boot | Backend |
| PostgreSQL | Database |
| OpenAI API | AI-powered responses |
| Java | Backend development |
| REST API | Frontend-backend communication |

## ⚙️ How It Works

1. User enters a question in the React chat interface.
2. The Spring Boot backend receives the request.
3. The AI agent understands and analyzes the user's query.
4. Relevant restaurant menu information is retrieved from PostgreSQL.
5. The retrieved information is provided to the OpenAI API.
6. The AI generates a relevant response.
7. The response is displayed to the user through the React frontend.

## 📁 Project Structure

```text
Restaurant-AI-Assistant/
│
├── frontend/          # React application
│
├── backend/           # Spring Boot application
│
├── README.md
└── .gitignore
```

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/restaurant-ai-assistant.git
cd restaurant-ai-assistant
```

### 2. Backend Setup

- Open the backend folder in your IDE.
- Configure your PostgreSQL database.
- Add your database credentials and OpenAI API key to your environment configuration.
- Run the Spring Boot application.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Configuration

Configure the following environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
DB_URL=your_postgresql_database_url
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

*Use your actual configuration property names and never commit API keys or passwords.*

## 🎯 Project Objective

The main objective of this project is to build an intelligent restaurant assistant that combines AI agents with database retrieval to provide accurate, context-aware restaurant information and improve the customer experience.

## 👨‍💻 Author

Developed as an AI-powered full-stack restaurant assistant project.

