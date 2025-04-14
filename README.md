<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Notes API

A robust and secure RESTful API built with NestJS, featuring user authentication, note management, and clean architecture principles.

## 🚀 Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - For type-safe code
- **Prisma** - Modern database ORM
- **SQLite** - Database
- **JWT** - For authentication
- **Bcrypt** - For password hashing
- **Class Validator** - For request validation

## 🏗️ Architecture

The project follows a clean architecture pattern with:

### Core Modules

- **User Module** - User management and authentication
- **Note Module** - Note CRUD operations
- **Auth Module** - Authentication and authorization

### Architecture Layers

- **Controllers** - HTTP request handlers
- **Use Cases** - Business logic implementation
- **Repositories** - Data persistence abstraction
- **Entities** - Domain models
- **DTOs** - Data transfer objects
- **View Models** - Response formatting
- **Guards** - Authentication middleware
- **Decorators** - Custom validators and metadata

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd api-nest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Configure your .env file with:

   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   JWT_EXPIRE="2592000"
   ```

4. **Setup Database**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

## 📝 API Endpoints

### Authentication

- POST `/auth/sign-in` - User login
- POST `/users` - Register new user

### Notes

- GET `/notes` - List all notes (authenticated)
- GET `/notes/:id` - Get specific note
- POST `/notes` - Create new note
- PATCH `/notes/:id` - Update note
- DELETE `/notes/:id` - Delete note

## 📝 API Documentation

### Swagger Documentation

Access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

### Available Endpoints

#### Authentication

- `POST /auth/sign-in` - Login
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string" }`

#### Users

- `POST /users` - Register new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: User object without password

#### Notes

- `GET /notes` - List all notes (authenticated)

  - Query params: `page` (optional), `limit` (optional)
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of notes

- `GET /notes/:id` - Get specific note

  - Headers: `Authorization: Bearer <token>`
  - Response: Note object

- `POST /notes` - Create new note

  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string", "description": "string" }`
  - Response: Created note

- `PATCH /notes/:id` - Update note

  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "title": "string", "description": "string" }`
  - Response: Updated note

- `DELETE /notes/:id` - Delete note
  - Headers: `Authorization: Bearer <token>`

### Error Responses

The API uses consistent error response format:

```json
{
  "message": "Error message",
  "fields": {
    "fieldName": "Error description"
  }
}
```

Common status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)

## 📦 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── useCases/
│   │   ├── strategies/
│   │   └── models/
│   ├── user/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── useCases/
│   └── note/
│       ├── entities/
│       ├── repositories/
│       └── useCases/
├── infra/
│   ├── database/
│   │   └── prisma/
│   └── http/
│       └── modules/
├── utils/
├── exceptions/
└── main.ts
```

## 🔒 Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Register a user using POST `/users`
2. Login using POST `/auth/sign-in`
3. Use the received JWT token in subsequent requests:
   ```
   Authorization: Bearer [your-token]
   ```

## 🧪 Testing

The project includes unit tests for the core business logic. Run tests using:

```bash
npm run test
```

## 📄 License

This project is [MIT licensed](LICENSE).

---

Made with ❤️ for my portfolio

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
