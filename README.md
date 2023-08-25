# Flask Backend with MongoDB

This project implements a backend API using Python Flask framework with MongoDB as the database. It provides endpoints for user authentication and message generation.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Login](#login)
    Route:http://127.0.0.1:5002/login
    Method:POST
    Body example:
                  {
                      "email":"a@gmail.com",
                      "password":"a123"
                  }
  - [Register](#register)
    Route:http://127.0.0.1:5002/register
    Method:POST
    Body example:
                  {
                      "name":"a",
                      "email":"a@gmail.com",
                      "password":"a123"
                  }
  - [Generate Message](#generate-message)
     Route:http://127.0.0.1:5002/generate-message
    Method:POST
    Body example:
                  {
                      "prompt":"Tell me the steps to learn helicopter"
                  }

## Technologies Used

- Python
- Flask
- MongoDB

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-backend-repo.git
   cd your-backend-repo
