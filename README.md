<p align="left">
  <img src="https://img.shields.io/badge/Framework-NestJS-bf3f5c">
  <img src="https://img.shields.io/badge/Language-TypeScript-3178c6">
  <img src="https://img.shields.io/badge/ORM-TypeORM-2560eb">
  <img src="https://img.shields.io/badge/Tests-Jest-9966ff">
  <img src="https://img.shields.io/badge/Auth-JWT-5fb885">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791">
  <img src="https://img.shields.io/badge/License-MIT-6db35d">
</p>

## Movie Booking System (Backend)

An architecturally robust Cinema Management API focused on **reliability** and **data integrity**. 
Besides basic CRUD this project solves critical distributed system challenges, such as **race conditions** and **transactional atomicity**.

**Note:** This is an on-going project with dockerization, tests, and a frontend being added soon.

### Key Technical Features

* **Concurrency Control** – Pessimistic locking (`pessimistic_write`) prevents double-booking of seats during peak traffic.
* **Atomic Transactions** – Multi-entity operations (Show/Seat validation + Reservation creation) wrapped in database transactions to guarantee data integrity.
* **Clean Architecture**  – Custom **composition decorators** (e.g., `@AdminController`) enforce security and maintain DRY principles across modules.
* **Encapsulated Modules** – Strict separation of `Public Client` vs `Admin` contexts, sharing a unified service layer for business logic.
* **Data Sanitization** – Global interceptors and class-transformers secure sensitive fields like emails and internal IDs.

### Project Structure

```text
src/
├── common/             # Global filters, interceptors, and custom decorators
├── modules/
│   ├── common/         # Custom Decorators, Guards, global Enums, and helpers
│   ├── auth/           # JWT strategy & role-based access control (RBAC)
│   ├── movies/         # Movie catalog + external API integration
│   ├── shows/          # Showtimes & scheduling (Time-overlap validation)
│   ├── screens/        # Theater room configurations
│   ├── seats/          # Seat mapping & availability
│   └── reservations/   # Core engine (atomic booking & concurrency handling)
├── seeds/              # Initial data to fill the DB with 
└── test/               # Integration tests (concurrency & auth)
```

### Database & Environment

This project requires **PostgreSQL** and specific environment variables to function correctly.

* **Database**: PostgreSQL (Default Port: `5432`).
* **Environment Variables**: Create a `.env` file in the root directory with the following:
    * `JWT_SECRET`: A secure string for signing authentication tokens.
    * `TMDB_API_KEY`: Your API key from [The Movie Database](https://www.themoviedb.org/documentation/api).
* **Schema Management**: Handled via TypeORM migrations.

### Running the Project (WIP)

```bash
# 1. Clone and install
$ npm install

# 2. Run migrations to setup the schema
$ npm run migration:run

# 3. Start the server
$ npm run start:dev
``` 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details