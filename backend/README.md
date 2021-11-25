# Backend

## Overview

- FastAPI for serving
- Catboost and LightGBM for the models

## Workflows

To install the dependencies:

```
# In this directory:
poetry install
```

To start the app up:

```
uvicorn backend.main:app --reload
```

The backend server will be located @ http://127.0.0.1:8000/

- The docs will be located @ http://127.0.0.1:8000/docs#/
