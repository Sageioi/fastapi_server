import uuid
from collections.abc import AsyncGenerator

from fastapi import Depends
from fastapi_users import BaseUserManager
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase, SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column,Text, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


DATABASE_URL = "sqlite+aiosqlite:///./mymomapi.db"
class Base(DeclarativeBase): pass
class User(SQLAlchemyBaseUserTableUUID,Base):
    __tablename__ = "user"
    task = relationship("Task",back_populates="user")
class Task(Base):
    __tablename__ = "task"

    id = Column(UUID(as_uuid = True), primary_key= True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid = True), ForeignKey("user.id"),default=uuid.uuid4)
    task_name = Column(Text, nullable=False)
    task_description = Column(String, nullable=False)
    date_created = Column(DateTime, nullable=False)
    time_created = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="task")


engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit = False)

async def create_db_tables(status=True):
    if status :
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    else:
        await engine.dispose()
        print("Engine is inactive")


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as async_session:
        yield async_session


async def get_user_db(session : AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)









