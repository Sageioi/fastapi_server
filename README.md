# myMOM API SERVER

This is an API Server designed to run asynchronous operations.
It is built for and serve as part of the stack of a productivity organizer.
---
### Components of the API server
The server is primarily built in Python and is made up of the following libraries which are to be included in your requirements.txt

* fastapi
* uvicorn
* sqlalchemy
* python-dotenv
* aiosqlite
* python-multipart
* fastapi_users
* fastapi_users_db_sqlalchemy
* fastapi-mail
* cloudinary

### fastAPI
It handles routing and the main app management.
\
It manages the app's operation and lifespan.

### uvicorn
It is the server that runs the app while in development.

### sqlaLchemy
It is an ORM mapper that can be use to interact with databases.

### python_dotenv
It is a library that loads environment variables.

### aiosqlite
It is a variant of sqlite designed for asynchronous operations.

### python-multipart
It supports multiform objects like images, videos e.t.c.

### fastapi_users
It is a variant of fastapi that is involved with users management
\
It also manages user authentication and the application's backend

### fastapi_users_db_sqlalchemy
It is a variant of sqlalchemy designed for fastapi_users

### fastapi-mail
It is a library that manages email messaging

### cloudinary
It is a library that manages image / video uploads 
\
It handles asset management

---

### In the app folder
 You should see 6 files 
> app\
> |----- config.py\
> |----- main.py\
> |----- models.py\
> |----- router.py\
> |----- schemas.py\
> |----- users.py

### config.py
Loads the API keys for cloudinary\
Ensure to load your API keys in an .env file instead of hardcoding it

For further knowledge:\
See https://cloudinary.com/documentation 

### main.py
Handles the main applications including routers

### models.py
Handles the database interaction

### router.py
Handles routing and http calls

### schemas.py
Handles the response models and classes

### users.py
Handles user authentication and backend logic

### How to get started

Go to server.py and click Run to start the development server

This should show up in your terminal
>INFO:     Will watch for changes in these directories: ['C:\\Users\\USER\\OneDrive\\Desktop\\myMom']\
 INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)\
 INFO:     Started reloader process [8200] using StatReload\
 INFO:     Started server process [15380]\
 INFO:     Waiting for application startup.\
 INFO:     Application startup complete.
 
Your server is running at http://127.0.0.1:8000




