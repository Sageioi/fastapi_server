import uuid

from pydantic import BaseModel
from fastapi_users import schemas

class Task_Schema(BaseModel):
    task_id: int
    task_name : str
    task_description : str

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass
class UserCreate(schemas.BaseUserCreate):
    pass
class UserUpdate(schemas.BaseUserUpdate):
    pass
