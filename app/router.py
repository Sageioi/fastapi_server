import os
import shutil
import tempfile
from datetime import datetime, date


import app.config
from cloudinary import uploader
from fastapi import APIRouter, Depends, Form, UploadFile , File, HTTPException
from sqlalchemy import select
from fastapi.responses import RedirectResponse, UJSONResponse

from app.models import Task, User

from sqlalchemy.ext.asyncio import AsyncSession
from app.models import get_async_session
from app.users import current_active_user

routes = APIRouter()
IMAGE_FORMAT = ["image/jpeg","image/jpg","image/svg"]
UPLOAD_DIR = "user_images_uploads"
@routes.post("/create_task")
async def create_task(user: User = Depends(current_active_user),task_name : str = Form(...),task_description : str = Form(...),session: AsyncSession = Depends(get_async_session)):
    try :
        task = Task(
            user_id = user.id,
            task_name = task_name,
            task_description = task_description,
            date_created = date.today(),
            time_created = datetime.utcnow(),
        )
        session.add(task)
        await session.commit()
        await session.refresh(task)
        message = {"message":"Task Successfully Created."}
        return UJSONResponse(message)
    except Exception as e :
        raise HTTPException(status_code=400, detail=f"Task Creation Failed:{e}")



@routes.get("/get_tasks")
async def get_tasks(user: User = Depends(current_active_user),session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Task).where((Task.user_id == user.id)).order_by(Task.time_created.desc()))
    task_result = (result.scalars().all())
    task_list = []
    n = 0
    for task in task_result:
            task_list.append({
                "id": n,
                "task_name": task.task_name,
                "task_description": task.task_description,
                "date_created": task.date_created.isoformat(),
                "time_created": task.time_created.isoformat()
            })
    n += 1
    return UJSONResponse({"tasks":task_list})


@routes.post("/post_profile_photo")
async def post_profile_photo(user_image : UploadFile = File(...),session: AsyncSession = Depends(get_async_session),active_user : User = Depends(current_active_user)):
    try:
        for format in IMAGE_FORMAT:
            if user_image.content_type == format :
                with tempfile.NamedTemporaryFile(delete=False) as tmp:
                    shutil.copyfileobj(user_image.file, tmp)
                uploader.upload(tmp.name,asset_folder=UPLOAD_DIR,public_id= str(active_user.id),overwrite=True,notification_url="https://images/notify_endpoint",resource_type="image")
                message = {"message":"Image Uploaded Successfully"}
                return UJSONResponse(message)
            else:
                return UJSONResponse({"message":"This file format is not supported"})
    except Exception as e :
        raise HTTPException(status_code=400, detail=f"Image Upload Failed:{e}")
    finally:
        os.remove(tmp.name)


@routes.patch("/update_profile_photo")
async def update_profile_photo(user_image : UploadFile = File(...),session: AsyncSession = Depends(get_async_session), active_user : User = Depends(current_active_user)):

    try:
        active_user = await session.execute(select(User).where(User.id == active_user.id))
        active_user = active_user.scalars().one_or_none()
        for format in IMAGE_FORMAT:
            if user_image.content_type == format :
                with tempfile.NamedTemporaryFile(delete=False) as tmp:
                    shutil.copyfileobj(user_image.file, tmp)
                uploader.upload(tmp.name,
                                           asset_folder=UPLOAD_DIR,
                                           public_id= str(active_user.id),
                                           overwrite=True,
                                           notification_url="https://images/notify_endpoint",
                                           resource_type="image")
                message = {"message":"Image Updated Successfully"}
                return UJSONResponse(message)
            else:
                return UJSONResponse({"message":"This file format is not supported"})

    except Exception as e :
        raise HTTPException(status_code=400, detail=f"Image Upload Failed:{e}")
    finally:
        os.unlink(tmp.name)

@routes.get("/get_photo")
async def get_photo(active_user : User = Depends(current_active_user),session: AsyncSession = Depends(get_async_session)):
    try:
        active_user = await session.execute(select(User).where(User.id == active_user.id))
        active_user = active_user.scalars().one_or_none()
        file_path = f"https://res.cloudinary.com/dbiyzch5s/image/upload/v1771449729/{active_user.id}.jpg"
        file = RedirectResponse(file_path)
        return file
    except Exception as e :
        raise HTTPException(status_code=400, detail=f"Image Retrieval Failed:{e}")


@routes.delete("/delete_task")
async def delete_task(task_name : str , session: AsyncSession = Depends(get_async_session), active_user : User = Depends(current_active_user)):
    result = await session.execute(select(Task).where(Task.task_name == task_name))
    task_result = (result.scalars().one_or_none())
    try:
        if task_result:
            if task_result.user_id == active_user.id:
                await session.delete(task_result)
                await session.commit()
                message = {"message":"Task Deleted Successfully"}
                return UJSONResponse(message)
        else:
            raise HTTPException(status_code=404, detail="Task not found")

    except Exception as e :
        return f"Deleting of Task Failed:{e}"





