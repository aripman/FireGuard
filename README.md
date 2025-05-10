# FireGuard project

## Project structure 

[API docs](img/project_structure.png)

### Project Overview
This full-stack application is composed of a React-based frontend and a FastAPI-powered backend, connected through a type-safe, auto-generated API client. It also includes a PostgreSQL database and supports secure authentication using JWT. The application is containerized using Docker and features built-in CI/CD pipelines, automated testing, and HTTPS-ready reverse proxying via Traefik.

### frontend
The frontend is built using the React framework, utilizing modern tools like Vite and TypeScript. It communicates with the backend via an auto-generated API client, which simplifies and standardizes interaction with the RESTful API.
### Backend
The backend is implemented with FastAPI, a modern, high-performance Python web framework designed for building APIs efficiently. It handles: Business logic, Input validation, API routing, Authentication, Communication with the database
### Database
The application uses PostgreSQL as its relational database management system. The database schema and migrations are managed using tools like Alembic (or SQLModel’s integrations), ensuring consistency and integrity across environments. Data access is abstracted via a clean service/CRUD layer.
### Authentication
Authentication is handled using JWT (JSON Web Tokens). This provides, Stateless authentication, no session storage on the server, Scalability, suitable for distributed systems and Security, tokens are signed and can be verified easily
### Testing
Backend tests are written using Pytest, ensuring correctness of API endpoints and business logic. Frontend uses Playwright for end-to-end browser-based testing. These help maintain high reliability and reduce regressions across features.
### Docker-based deployment 
The stack is fully containerized using Docker Compose. Each component (frontend, backend, database, admin UI, proxy) runs in its own isolated container. This setup supports consistent local development and cloud deployment with a single command.
### Traefik Proxy & HTTPS
Traefik acts as a reverse proxy and load balancer. It handles subdomain-based routing (e.g., api.example.com, dashboard.example.com). It also manages HTTPS certificates automatically using Let’s Encrypt. The project uses .env files to manage environment-specific variables. Supports clean separation of development, staging, and production configurations. Secrets and settings can be overridden securely in CI/CD pipelines or runtime environments.
### Continuous Integration & Deployment
The project includes GitHub Actions workflows to automate: Linting and testing on every commit, deployment to remote environments (e.g., staging/production servers), this enables safe, efficient, and consistent release cycles.

## flow chart for making a user (password hashing) and login (gain a access token)

### Make a new user
[API docs](img/Flow_chart_make_a_user.png)

### login 
[API docs](img/Flow_chart_login_and_accessToken.png)

## flow chart for fire risk prediction
[API docs](img/Flow_chart_fire_risk.png)

## Docker compose

- Start the local stack with Docker Compose:

```bash
docker compose watch
```

- Now you can open your browser and interact with these URLs:

Frontend, built with Docker, with routes handled based on the path: http://localhost:5173

Backend, JSON based web API based on OpenAPI: http://localhost:8000

Automatic interactive documentation with Swagger UI (from the OpenAPI backend): http://localhost:8000/docs

Adminer, database web administration: http://localhost:8080

Traefik UI, to see how the routes are being handled by the proxy: http://localhost:8090

Note: The first time you start your stack, it might take a minute for it to be ready. While the backend waits for the database to be ready and configures everything. You can check the logs to monitor it.

Note: Take a look at the .ENV files for login details, you can also create a new user when going to the frontend.
