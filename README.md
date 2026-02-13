<p>
  <img alt="" src="https://img.shields.io/badge/Framework-NestJS-bf3f5c">
  <img alt="" src="https://img.shields.io/badge/Language-TypeScript-3178c6">
  <img alt="" src="https://img.shields.io/badge/ORM-TypeORM-2560eb">
  <img alt="" src="https://img.shields.io/badge/Tests-Jest-9966ff">
  <img alt="" src="https://img.shields.io/badge/Auth-JWT-5fb885">
  <img alt="" src="https://img.shields.io/badge/Database-PostgreSQL-336791">
  <img alt="" src="https://img.shields.io/badge/License-MIT-6db35d">
</p>

## Movie Booking System (Backend)

An architecturally robust Cinema Management API focused on **reliability** and **data integrity**. 
Besides basic CRUD this project solves critical distributed system challenges, such as **race conditions** and **transactional atomicity**.

**Note:** This is an ongoing project with more tests, and a frontend being added soon.

--- 
### Key Technical Features

* **Concurrency Control** – Pessimistic locking (`pessimistic_write`) prevents double-booking of seats during peak traffic.
* **Atomic Transactions** – Multi-entity operations (Show/Seat validation + Reservation creation) wrapped in database transactions to guarantee data integrity.
* **Clean Architecture**  – Custom **composition decorators** (e.g., `@AdminController`) enforce security and maintain DRY principles across modules.
* **Encapsulated Modules** – Strict separation of `Public Client` vs `Admin` contexts, sharing a unified service layer for business logic.
* **Data Sanitization** – Global interceptors and class-transformers secure sensitive fields like emails and internal IDs.
---
### Project Structure

```text
src/
├── common/             # Custom Decorators, Guards, global Enums, and helpers
├── db/               
│   └── seeds/          # Initial data to fill the DB with 
├── modules/
│   ├── auth/           # JWT strategy & role-based access control (RBAC)
│   ├── bookings/       # Core engine (atomic booking & concurrency handling)
│   ├── movies/         # Movie catalog + external API integration
│   ├── screens/        # Theater room configurations
│   ├── seats/          # Seat mapping & availability
│   └── shows/          # Times & scheduling (Time-overlap validation)
└── test/               # Integration tests (concurrency & auth)
```
---
## Getting Started

### 1. Installation & Environment
First, install the dependencies and set up your environment files.

```bash
$ npm install
```

Create two files in the root directory: .env and .env.test. Use the credentials defined in `docker-compose.yml`.

`.env` (Development):
- DB_PORT=5432
- DB_DATABASE=movie_app
- JWT_SECRET: A secure string for signing tokens
- TMDB_API_KEY: Your key from [The Movie Database](https://www.themoviedb.org/)

`.env.test` (Testing):
- DB_PORT=5433
- DB_DATABASE=movie_app_test
---
### 2. Database Infrastructure
This project uses Docker to manage PostgreSQL instances. This ensures your development data stays safe while tests 
wipe the test database.

```bash
# Spin up both Development (5432) and Testing (5433) databases
$ docker-compose up -d
```
---
### 3. Running the Project 

```bash
# 1. Run migrations to setup the schema
$ npm run migration:run

# 2. Populate the database with dummy data
$ npm run seed

# 3. Start the server in watch mode
$ npm run start:dev
```
---
## Testing
We use Jest for E2E testing. The test suite is configured to automatically use the `.env.test` environment to target 
the isolated test container.
```bash
# Run End-to-End tests
$ npm run test:e2e
```

**Note**: The E2E tests include a beforeEach hook that truncates all tables to ensure a clean state for every test case. 
Do not run tests against your production or primary development database!

---
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details