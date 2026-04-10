from dotenv import load_dotenv
load_dotenv(override=False)

import uuid
import os
from typing import Optional
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, UUIDIDMixin, FastAPIUsers
from fastapi_users.authentication import BearerTransport, AuthenticationBackend, JWTStrategy
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase

from app.models import get_user_db, User

SECRET = os.getenv("APP_SECRET_KEY")

if SECRET is None:
    raise ValueError("APP_SECRET_KEY environment variable is not set!")
class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_lifetime_seconds = 120

    @property
    def reset_password_token_secret(self):
        return os.getenv("APP_SECRET_KEY")

    @property
    def verification_token_secret(self):
        return os.getenv("APP_SECRET_KEY")

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.email} is registered.")

    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        print(f"User {user.email} forgot their password. Reset token: {token}")

    async def on_after_verify(self, user: User, request: Optional[Request] = None, token: str = None):
        print(f"User {user.email} verified. Verification token: {token}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


def get_jwt_strategy():
    print(f"SECRET_KEY in strategy: {SECRET}")
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


transport = BearerTransport(tokenUrl="/auth/jwt/login")

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])
current_active_user = fastapi_users.current_user(active=True)