FROM python:3.9
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
COPY ./data /code/data
COPY ./productionModels /code/productionModels
COPY ./config.yml /code/config.yml
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./backend /code/backend
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "5001"]
# nginx SSL
# CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "5001"]
