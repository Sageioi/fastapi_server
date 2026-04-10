from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from app.router import routes
from contextlib import asynccontextmanager
from app.models import create_db_tables
import os
from app.schemas import UserCreate, UserRead, UserUpdate
from app.users import fastapi_users, auth_backend
from fastapi.middleware.cors import CORSMiddleware

FRONTEND_URL : list = ["https://my-mom-tan.vercel.app","https://my-mom-git-main-sageiois-projects.vercel.app"]
@asynccontextmanager
async def lifespan(app : FastAPI):
    await create_db_tables()
    yield
app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware,
                   allow_origins = FRONTEND_URL,
                   allow_credentials = True,
                   allow_methods = ["*"],
                   allow_headers = ["*"])
app.include_router(routes)
app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt",tags=["auth"])
app.include_router(fastapi_users.get_register_router(UserRead,UserCreate), prefix="/auth",tags=["auth"])
app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth",tags=["users"])
app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth",tags=["auth"])
app.include_router(fastapi_users.get_users_router(UserRead,UserUpdate), prefix="/users",tags=["users"])

