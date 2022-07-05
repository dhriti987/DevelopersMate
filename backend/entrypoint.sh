#!/bin/sh

set -e
wget -qO- https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for | sh -s -- db:3306 -- echo success
python manage.py collectstatic --no-input
python manage.py migrate
gunicorn -b 0.0.0.0:8000 DevelopersMate.asgi:application -w 4 -k uvicorn.workers.UvicornWorker