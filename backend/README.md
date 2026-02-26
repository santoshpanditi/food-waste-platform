# Vishnu Backend - Spring Boot + MySQL

## Prerequisites
- Java 17 or higher
- MySQL 8.0+
- Maven 3.6+

## Database Setup

### 1. Create MySQL Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE vishnu_db;
CREATE USER 'vishnu_user'@'localhost' IDENTIFIED BY 'vishnu_pass';
GRANT ALL PRIVILEGES ON vishnu_db.* TO 'vishnu_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Update Database Configuration
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=vishnu_user
spring.datasource.password=vishnu_pass
```

## Running the Backend

### Build
```bash
cd backend
mvn clean install
```

### Run
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user/{id}` - Get user details
- `PUT /api/auth/user/{id}` - Update user profile

### Food Listings
- `POST /api/listings` - Create a food listing
- `GET /api/listings/available` - Get all available listings
- `GET /api/listings/donor/{donorId}` - Get donor's listings
- `GET /api/listings/{id}` - Get listing details
- `PUT /api/listings/{id}` - Update listing
- `PUT /api/listings/{id}/status` - Update listing status
- `DELETE /api/listings/{id}` - Delete listing

### Claims
- `POST /api/claims` - Create a claim
- `PUT /api/claims/{id}/approve` - Approve claim
- `PUT /api/claims/{id}/complete` - Complete claim
- `GET /api/claims/claimant/{claimantId}` - Get user's claims
- `GET /api/claims/listing/{listingId}` - Get claims for listing

## Default Configuration
- Port: 8080
- Database: vishnu_db
- JWT Secret: Change in production
- JWT Expiration: 24 hours

## Project Structure
```
backend/
├── src/main/java/com/vishnu/backend/
│   ├── controller/        # REST Controllers
│   ├── service/           # Business Logic
│   ├── entity/            # JPA Entities
│   ├── repository/        # Data Access Layer
│   ├── dto/              # Data Transfer Objects
│   └── VishnuBackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## Features
- User Authentication & Authorization (JWT)
- Food Listing Management
- Claim System
- Impact Scoring
- CORS Support for React Frontend
- MySQL Database Integration
