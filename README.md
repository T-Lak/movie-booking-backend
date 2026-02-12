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
├── common/             # Custom Decorators, Guards, global Enums, and helpers
├── db/               
│   └── seeds/          # Initial data to fill the DB with 
├── modules/
│   ├── auth/           # JWT strategy & role-based access control (RBAC)
│   ├── bookings/       # Core engine (atomic booking & concurrency handling)
│   ├── movies/         # Movie catalog + external API integration
│   ├── screens/        # Theater room configurations
│   ├── seats/          # Seat mapping & availability
│   └── shows/          # Showtimes & scheduling (Time-overlap validation)
└── test/               # Integration tests (concurrency & auth)
```

### Database & Environment

This project requires **PostgreSQL** and specific environment variables to function correctly.

* **Database**: PostgreSQL (Default Port: `5432`).
* **Environment Variables**: Create a `.env` file in the root directory with the following:
    * `JWT_SECRET`: A secure string for signing authentication tokens.
    * `TMDB_API_KEY`: Your API key from [The Movie Database](https://www.themoviedb.org/documentation/api).
* **Schema Management**: Handled via TypeORM migrations.

To populate the database with dummy data run:
```bash
npm run seed
```

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details