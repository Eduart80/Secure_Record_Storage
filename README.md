# Secure Record Storage

A secure MERN backend application for storing and managing user notes and records. This app uses JWT-based authentication and provides RESTful APIs for user and note management.

## Features
- User registration and login
- JWT Bearer token authentication
- Secure note creation, retrieval, update, and deletion
- MongoDB database connection
- Modular controllers, models, and routes

## Project Structure
```
package.json
server.js
controllers/
  notesController.js
  userController.js
db/
  connection.js
models/
  Note.js
  userAuth.js
routes/
  notes.js
  userRouter.js
utils/
  auth.js
```

## API Endpoints

### Authentication
- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive JWT token

### Notes
- `GET /notes` — Get all notes (requires Bearer token)
- `POST /notes` — Create a new note (requires Bearer token)
- `PUT /notes/:id` — Update a note (requires Bearer token)
- `DELETE /notes/:id` — Delete a note (requires Bearer token)

## Usage
Include the JWT token in the `Authorization` header as:
```
Authorization: Bearer <your_token>
```

