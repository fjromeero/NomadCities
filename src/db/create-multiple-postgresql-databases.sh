#!/bin/bash

set -e
set -u

function create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"

    # Verificar si la base de datos ya existe
    local db_exist=$(psql -tAc "SELECT 1 FROM pg_database WHERE datname='$database'")
    if [[ "$db_exist" == "1" ]]; then
        echo "  Database '$database' already exists, skipping creation."
    else
        echo "  Creating database '$database'"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
            CREATE DATABASE $database;
EOSQL
        echo "  Database '$database' created."
    fi
}

if [ -n "$POSTGRES_DB" ]; then
    echo "Multiple database creation requested: $POSTGRES_DB"
    for db in $(echo $POSTGRES_DB | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi
