# Pavement Management System (PMS)

The **Pavement Management System (PMS)** is a web-based application designed to help manage and maintain pavement infrastructure efficiently. It enables users to track pavement conditions, schedule maintenance, and analyze data for better decision-making.

## Features

- **Pavement Condition Monitoring**: Track and assess pavement conditions.
- **Maintenance Scheduling**: Plan and schedule repair and maintenance activities.
- **Data Analytics & Reports**: Generate insights for better pavement management.
- **User Management**: Role-based access control for different users.
- **Interactive Dashboard**: Visual representation of pavement data.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for backend development)
- [PostgreSQL](https://www.postgresql.org/) (for database management)
- [Angular CLI](https://angular.io/) (for frontend development)
- [npm](https://www.npmjs.com/) (for managing dependencies)

## Installation

### Backend (Node.js, Express & PostgreSQL)

1. Clone the repository:

   ```bash
   git clone https://github.com/shimels1/Pavement-Management-System-PMS-.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:  
   Create a `.env` file in the backend directory and add the following:

   ```env
   DB_HOST=localhost
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=pavement_db
   DB_PORT=5432
   PORT=5000
   ```

5. Create the database in PostgreSQL:

   ```sql
   CREATE DATABASE pavement_db;
   ```

6. Run database migrations (if applicable):

   ```bash
   npx sequelize-cli db:migrate
   ```

7. Start the backend server:

   ```bash
   npm start
   ```

   The backend will be running at `http://localhost:5000`.

### Frontend (Angular)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular application:

   ```bash
   ng serve
   ```

   The frontend will be available at `http://localhost:4200`.
   
## Screenshots

![ScreenShot](https://raw.githubusercontent.com/shimels1/Pavement-Management-System-PMS-/refs/heads/main/screenshots/1.png)
![ScreenShot](https://raw.githubusercontent.com/shimels1/Pavement-Management-System-PMS-/refs/heads/main/screenshots/2.png)
![ScreenShot](https://raw.githubusercontent.com/shimels1/Pavement-Management-System-PMS-/refs/heads/main/screenshots/3.png)
![ScreenShot](https://raw.githubusercontent.com/shimels1/Pavement-Management-System-PMS-/refs/heads/main/screenshots/4.png)
![ScreenShot](https://raw.githubusercontent.com/shimels1/Pavement-Management-System-PMS-/refs/heads/main/screenshots/5.png)


This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
