# NomadCities
This repository hosts the source code and associated documentation for the final degree project that focuses on the development of an innovative web application. The main objective of this application is to provide users with a comprehensive platform for the consultation and rating of cities, specially designed for telecommuters.

## Backend Requirements

* [Docker](https://www.docker.com/).
* [Docker Compose](https://docs.docker.com/compose/install/).
* [Poetry](https://python-poetry.org/) for Python package and environment management.

## Frontend Requirements

* Node.js (with `npm`).

## Local development

* Start the stack with Docker Compose:

```bash
docker-compose up -d
```

* Now you can open your browser and interact with these URLs:

Frontend, built with Docker, with routes handled based on the path: http://localhost:4321

Backend, JSON based web API: http://localhost

PGAdmin, PostgreSQL web administration: http://localhost:5050

> [!NOTE]  
> The first time you start your stack, it might take a minute for it to be ready. While the backend waits for the database to be ready and configures everything. You can check the logs to monitor it.

To check the logs, run:

```bash
docker-compose logs
```

To check the logs of a specific service, add the name of the service, e.g.:

```bash
docker-compose logs backend
```