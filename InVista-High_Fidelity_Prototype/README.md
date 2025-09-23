# InVista

### User Credentials

| username | password |
|:----------:|:----------:|
| invista  | afterall | 

### Database structure
### `auth` Table

- `id` (INTEGER, NOT NULL, PRIMARY KEY)
- `username` (TEXT, NOT NULL, UNIQUE)
- `password` (TEXT, NOT NULL)

### `questions` Table

- `id` (INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMENT)
- `title` (TEXT, NOT NULL)
- `difficulty` (TEXT, NOT NULL)
- `company` (INTEGER, NOT NULL)
- `description` (TEXT, NOT NULL)

### `submissions` Table

- `id` (INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMENT)
- `question_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES questions(id))
- `author` (TEXT, NOT NULL, FOREIGN KEY REFERENCES auth(username))
- `code` (TEXT, NOT NULL)
- `notes` (TEXT)
- `timestamp` (REAL, NOT NULL) example: ` 2024-01-05 14:50:33`

# APIS


## Authentication Endpoints

### Login
- **Endpoint:** `POST /sessions`
- **Description:** Authenticate a user and create a session.
- **Request Body:**
  - `{ "username": "example_user", "password": "example_password" }`
- **Response:**
  - Successful response (status code 201):
    ```json
    { "id": 1 }
    ```
  - Unauthorized response (status code 401):
    ```json
    { "error": "Not authorized" }
    ```

### Current Session
- **Endpoint:** `GET /sessions/current`
- **Description:** Get information about the current user session.
- **Response:**
  - Authorized response (status code 200):
    ```json
    { "id": 1 }
    ```
  - Unauthorized response (status code 401):
    ```json
    { "error": "Not authenticated" }
    ```

### Logout
- **Endpoint:** `DELETE /sessions/current`
- **Description:** Logout and terminate the current user session.
- **Response:**
  - Successful response (status code 204):
    ```json
    {}
    ```

## Question Endpoints

### Get All Questions
- **Endpoint:** `GET /questions`
- **Description:** Get a list of all coding interview questions.
- **Authorization:** Requires user to be logged in.
- **Response:**
  - Authorized response (status code 200):
    ```json
    [
      { "id": 1, "title": "Two Sum", "difficulty": "Easy", "company": "Google" },
      { "id": 2, "title": "Reverse Linked List", "difficulty": "Medium", "company": "Microsoft" },
      // ... other questions
    ]
    ```
  - Unauthorized response (status code 401):
    ```json
    { "error": "Not authenticated" }
    ```

### Get Question by ID
- **Endpoint:** `GET /api/questions/:questionId`
- **Description:** Get details of a specific question by its ID.
- **Authorization:** Requires user to be logged in.
- **Parameters:**
  - `questionId` (integer): ID of the question.
- **Response:**
  - Authorized response (status code 200):
    ```json
    { "id": 1, "title": "Two Sum", "difficulty": "Easy", "company": "Google", "description": "Given an array...", ... }
    ```
  - Unauthorized response (status code 401):
    ```json
    { "error": "Not authenticated" }
    ```
  - Not Found response (status code 404):
    ```json
    { "error": "Question not found" }
    ```

### Get Submissions for a Question and User
- **Endpoint:** `GET /questions/:questionId/submissions/`
- **Description:** Get submissions for a specific question and user.
- **Authorization:** Requires user to be logged in.
- **Parameters:**
  - `questionId` (integer): ID of the question.
- **Response:**
  - Authorized response (status code 200):
    ```json
    [
      { "id": 1, "question_id": 1, "author": "example_user", "code": "console.log('Hello, World!');", "notes": "No additional notes", "timestamp": "2022-01-01 12:00:00" },
      { "id": 2, "question_id": 1, "author": "example_user", "code": "console.log('Another solution for Two Sum!');", "notes": "Consider using a hash table", "timestamp": "2022-01-02 14:30:00" },
      // ... other submissions
    ]
    ```
  - Unauthorized response (status code 401):
    ```json
    { "error": "Not authenticated" }
    ```