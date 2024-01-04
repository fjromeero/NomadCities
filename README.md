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
docker-compose logs nomadcities_backend
```

## Migrations
To run the migrations you will need to run the migrations with `alembic` commands inside the container.

Make sure you create a "revision" of your models and that you "upgrade" your database with that revision every time you change them. As this is what will update the tables in your database. Otherwise, the application will have errors.

* Start an interactive session in the backend container:

```console
$ docker-compose exec nomadcities_backend bash
```

* If you created a new model in `./backend/app/app/models/`, make sure to import it in `./backend/app/app/db/base.py`, that Python module (`base.py`) that imports all the models will be used by Alembic.

* After changing a model (for example, adding a column), inside the container, create the revision, e.g.:

```console
$ alembic revision --autogenerate -m "First revision"
```

* After creating the revision, run the migration in the database (this is what will actually change the database):

```console
$ alembic upgrade head
```

There is alredy a revision file with the default models on `./backend/app/alembic/versions/`. If you want to remove them / modify them, from the beginning, without having any previous revision, you can remove the revision files and then create a first migration as described above.