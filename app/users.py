import uuid
from typing import Optional
from fastapi import Depends, Request
import os
from fastapi_users import BaseUserManager, UUIDIDMixin, models, FastAPIUsers
from fastapi_users.authentication import BearerTransport, AuthenticationBackend, JWTStrategy
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase, SQLAlchemyBaseUserTableUUID

from app.models import get_user_db, User

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("APP_SECRET_KEY")

class UserManager(UUIDIDMixin,BaseUserManager[User,uuid.UUID]):
    reset_password_token_secret = SECRET_KEY
    verification_token_secret = SECRET_KEY
    reset_password_token_lifetime_seconds = 120


    async def on_after_register(self, user: User , request: Optional[Request] = None):
        print(f"User {user.email} is registered.")
    async def on_after_forgot_password(self, user: User, token: str , request: Optional[Request] = None):
        print(f"User {user.email} forgot their password. Reset token: {token}")
    async def on_after_verify(self, user: User, request: Optional[Request] = None, token: str = None):
        print(f"User {user.email} verified. Verification token: {token}")

async def get_user_manager(user_db : SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)

def get_jwt_strategy():
    return JWTStrategy(
        secret = SECRET_KEY,
        lifetime_seconds=3600,
    )

transport = BearerTransport(tokenUrl="/auth/jwt")

auth_backend = AuthenticationBackend(
    name = "auth",
    transport = transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager,[auth_backend])
current_active_user = fastapi_users.current_user(active=True)