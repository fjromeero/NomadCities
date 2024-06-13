FROM ubuntu:latest

RUN apt update
RUN apt-get update && apt-get install -y \
    cron \
    gcc \
    python3 \
    python3-pip \
    python3-venv

ADD crontab /etc/cron.d/hello-cron
RUN chmod 0644 /etc/cron.d/hello-cron
RUN touch /var/log/cron.log

WORKDIR . /app/
COPY . /app/

# Crear un entorno virtual para Python
RUN python3 -m venv /app/venv

# Activar el entorno virtual y instalar las dependencias de Python
RUN /app/venv/bin/pip install -r /app/requirements.txt

# Dar permisos de ejecución al archivo de la aplicación (si es necesario)
RUN chmod +x /app/app.py

# Establecer el entorno virtual como el intérprete de Python por defecto
ENV PATH="/app/venv/bin:$PATH"

CMD cron && tail -f  /var/log/cron.log
