# Photo Comment App

Photo Comment App is a web application that allows users to upload and comment on photos.

## Requirements

- Node.js v18 or higher
- PostgreSQL

## Project Structure

```plaintext
/src
  /components
    - PhotoCard.tsx
    - UploadPhoto.tsx
  /handlers
    - commentHandlers.ts
    - uploadHandlers.ts
  /helpers
    - imageHelper.ts
  /services
    - commentService.ts
    - photoService.ts
  /styles
    - globals.css
  /pages
    /api
        - comments.ts
        - photos.ts
    - index.tsx
  /api
    - comments.ts
    - photos.ts
```

## Running the Application with Docker Compose

### 1. Start the docker

```bash
docker-compose up --build
```

### 2. Docker info

```plaintext
Webapp running on port 3000
Postgres database is running on port 5432
```

## Running the Application Locally

### 1. Start PostgreSQL

Start PostgreSQL locally and create the necessary database.

### 2. Configure the Database

Update `DATABASE_URL` in `.env` or configure it directly in the source code.

### 3. Install Dependencies

Install the dependencies by running:

```bash
npm install
```

### 4. Run the Application

Init database:

```
npm run db:sync
```

Run the application in development mode:

```bash
npm run dev
```

## Contributing

If you would like to contribute to the project, please create a pull request and describe your changes in detail.

## License

This project is licensed under the MIT License.
