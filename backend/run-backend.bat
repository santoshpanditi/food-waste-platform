@echo off
REM Vishnu Backend Startup Script for Windows

echo Starting Vishnu Backend...
echo.

REM Set Maven PATH
set MAVEN_PATH=C:\Users\sivag\.maven\maven-3.9.12(2)\bin
set PATH=%MAVEN_PATH%;%PATH%

REM Navigate to backend directory
cd /d "C:\Users\sivag\Desktop\FSD\vishnu\backend"

REM Run Spring Boot
echo Running Spring Boot application...
mvn spring-boot:run

pause
