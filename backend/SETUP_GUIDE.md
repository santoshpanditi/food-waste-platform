# Vishnu Backend - Setup & Running Guide

## Prerequisites
- Java 17+
- Maven 3.9+
- MySQL 8.0+

## Step 1: Install MySQL (Windows)

### Option A: Using Chocolatey
```powershell
choco install mysql
```

### Option B: Download from MySQL Website
1. Download from: https://dev.mysql.com/downloads/mysql/
2. Run installer and follow setup wizard
3. Remember the root password

## Step 2: Create Database

```sql
mysql -u root -p

-- Then run:
CREATE DATABASE vishnu_db;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON vishnu_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Update Database Configuration

Edit: `backend/src/main/resources/application.properties`

```properties
spring.datasource.username=root
spring.datasource.password=root
```

## Step 4: Build the Backend

```powershell
cd backend
mvn clean compile
```

## Step 5: Run the Backend

```powershell
$env:PATH = "C:\Users\sivag\.maven\maven-3.9.12(1)\bin;$env:PATH"
mvn spring-boot:run
```

The backend will start on: **http://localhost:8080**

## Verify Backend is Running

```powershell
curl http://localhost:8080/actuator/health
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/user/{id}` - Get user
- `PUT /api/auth/user/{id}` - Update user

### Food Listings
- `GET /api/listings/available` - Get all available listings
- `POST /api/listings` - Create listing
- `GET /api/listings/{id}` - Get listing details
- `PUT /api/listings/{id}` - Update listing
- `DELETE /api/listings/{id}` - Delete listing

### Claims
- `POST /api/claims` - Create claim
- `GET /api/claims/claimant/{id}` - Get user claims
- `PUT /api/claims/{id}/approve` - Approve claim
- `PUT /api/claims/{id}/complete` - Complete claim

## Troubleshooting

### MySQL Connection Error
Make sure MySQL is running:
```powershell
mysql -u root -p
```

### Port 8080 Already in Use
Change in `application.properties`:
```properties
server.port=8081
```

### Maven Not Found
Add Maven to PATH:
```powershell
$env:PATH = "C:\Users\sivag\.maven\maven-3.9.12(1)\bin;$env:PATH"
```

## Frontend Integration

Your React frontend (running on `http://localhost:5173`) is already configured to communicate with this backend at `http://localhost:8080`.

CORS is enabled for:
- http://localhost:5173
- http://localhost:3000
