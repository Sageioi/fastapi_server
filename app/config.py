from dotenv import load_dotenv
load_dotenv()
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api
import json


config = cloudinary.config(secure=True)
