# OpenMusic API

A RESTful API for the OpenMusic application, built with **Node.js** and **Express**.

## Features

* RESTful API for managing application resources
* Redis caching for API data
* RabbitMQ as a message broker
* Consumer service for asynchronous message processing

## Tech Stack

* Node.js
* Express
* Redis
* RabbitMQ

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/farismns/openMusic_V3.git
cd openMusic_V3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure the required application, database, Redis, and RabbitMQ settings.

### 4. Run the application

```bash
npm run start
```

Run the consumer service according to the configuration provided in the project.

## Project Structure

```text
openMusic_V3/
├── consumer/
├── final-test-submission3/
└── README.md
```

## Purpose

This project was developed to practice **Back-End Development**, including RESTful API development, caching, and asynchronous message processing.

## Author

**Faris Maulana Saputra**

GitHub: https://github.com/farismns
