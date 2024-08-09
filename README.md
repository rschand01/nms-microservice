# Notification Management System (NMS) - Backend

## Architecture: Microservice

This project is a comprehensive Notification Management System (NMS) backend built with **Node.js, Express, Redis, KafkaJS, Bull and JavaScript.** It includes features for handling notifications, user preferences, and integrates various technologies to demonstrate the system's robustness and scalability.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Notification scheduling and delivery via email, SMS, and push notifications
- Rate limiting using Bull for message dispatch
- Rate limiting using Express Rate Limit & Redis for API Endpoint rate limiting 
- KafkaJS for event-driven communication
- Robust error handling and logging
- Redis for caching and optimizing performance
- JOI for error handling
- Winston for logging

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rschand-dev/nms-microservice.git
   cd nms-microservice
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   # Example: EXPRESS_PORT=3001
   EXPRESS_PORT=PORT_NUMBER

   # Example: WINSTON_SERVICE="nms-backend-microservice"
   WINSTON_SERVICE=SERVICE_NAME

   # Example: NODE_ENV=development
   # Example: NODE_ENV=production
   NODE_ENV=ENVIRONMENT

   # Example: REDIS_CLIENT_PASSWORD=enteryourredispasswordhere
   REDIS_CLIENT_PASSWORD=PASSWORD

   # Example: REDIS_CLIENT_HOST=enteryourredishosthere
   REDIS_CLIENT_HOST=HOST

   # Example: REDIS_CLIENT_PORT=30982
   REDIS_CLIENT_PORT=PORT_NUMBER

   # Example: CORS_ORIGIN=http://localhost:3001
   CORS_ORIGIN=ALLOWED_ORIGIN

   # Example: APACHE_KAFKA_CLIENT_ID=my-app
   APACHE_KAFKA_CLIENT_ID=CLIENT_ID

   # Example: APACHE_KAFKA_BROKER_1=localhost:9092
   APACHE_KAFKA_BROKER_1=APACHE_KAFKA_BROKER_HOST

   # Example: APACHE_KAFKA_BROKER_2=localhost:9093
   APACHE_KAFKA_BROKER_2=APACHE_KAFKA_BROKER_HOST

   # Example: APACHE_KAFKA_CONSUMER_GROUP_ID=test-group
   APACHE_KAFKA_CONSUMER_GROUP_ID=GROUP_ID

   # Refer Kafka.js documentation to learn more. Link: https://kafka.js.org/docs/getting-started
   KAFKAJS_NO_PARTITIONER_WARNING=1;
   ```

4. **Setup Docker**

**Unix & Linux**

   ```bash
   sudo docker pull apache/kafka:3.8.0
   ```

   ```bash
   sudo docker run -d --name kafka1 -p 9092:9092 apache/kafka:3.8.0
   ```

   ```bash
   sudo docker run -d --name kafka2 -p 9093:9093 apache/kafka:3.8.0
   ```

**Windows**

   ```powershell
   docker pull apache/kafka:3.8.0
   ```

   ```powershell
   docker run -d --name kafka1 -p 9092:9092 apache/kafka:3.8.0
   ```

   ```powershell
   docker run -d --name kafka2 -p 9093:9093 apache/kafka:3.8.0
   ```

5. **Setup Redis**

  * **Create a Redis Account & connect to the redis cloud.**

6. **Start the server:**

   ```bash
   npm run start
   ```

## Configuration

The project uses environment variables for configuration. Refer to the [`.env.example`](.env.example) file for the required variables. Make sure to set these variables in your `.env` file.

## Usage

### Starting the Server

To start the server in development mode:

```bash
npm run serve
```

If all goes well, then you should have something similar in your terminal. Refer Below:

```powershell
npm run serve  

> nms-microservice@1.0.0 preserve
> npx eslint .


> nms-microservice@1.0.0 serve
> nodemon ./server.mjs

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./server.mjs`
info: Connection to Redis Data Store have been established! (Bull.js) {"timestamp":"2024-08-10 01:19:30"}
info: Connection to Apache Kafka has been established successfully! {"additional":"brokers: localhost:9092,localhost:9093","are":"clientId: my-app","timestamp":"2024-08-10 01:19:30"}
info: Successfully subscribed to the Topic: transcational {"timestamp":"2024-08-10 01:19:30"}
info: Successfully subscribed to the Topic: promotional {"timestamp":"2024-08-10 01:19:30"}
info: Express Server is successfully listening! {"additional":"port: 5000","timestamp":"2024-08-10 01:19:30"}
info: Connection to Redis Data Store have been established! {"additional":"port: 19314","timestamp":"2024-08-10 01:19:30"}
```

## API Documentation

Use a tool like Postman, Thunder Client extension in Visual Studio Code or Insomnia to test the API endpoints. Refer to the API Endpoints section for a list of available routes.

## Project Structure

Please click on [PROJECT_STRUCTURE](PROJECT_STRUCTURE) to view the project structure.

Alternatively you can find the `PROJECT_STRUCTURE` file in the root directory of this repository and or project folder.

## API Endpoints

### Authentication

- **POST** /produce-notification - Sends/Publishes message using Kafka to the Kafka Broker (Specified Topic)
- **POST** /consume-notification - Retrieves/Subscribe to the messages using Kafka to the Kafka Broker (Specified Topic)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Open a pull request

## License

This project is licensed under the [`GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007`](LICENSE)

See the [License](LICENSE) for details.

## Copyright

© 2024 [Reginald Chand](https://github.com/rschand-dev). All rights reserved.

**Repository:** [`nms-microservice`](https://github.com/rschand-dev/nms-microservice)

---

Designed & Developed with 😍 💝🌺

**Kind Regards**

Reginald Chand
