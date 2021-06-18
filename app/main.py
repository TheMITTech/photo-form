import os
import boto3
from typing import Optional, List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

# get environment variables
S3_ENDPOINT = os.environ['S3_ENDPOINT']
S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
S3_SECRET_KEY = os.environ['S3_SECRET_KEY']
S3_BUCKET_NAME = os.environ['S3_BUCKET_NAME']

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# S3 Setup - this should go in individual functions
s3 = boto3.resource('s3',
    endpoint_url = S3_ENDPOINT,
    aws_access_key_id = S3_ACCESS_KEY,
    aws_secret_access_key = S3_SECRET_KEY
)
bucket = s3.Bucket(S3_BUCKET_NAME)

@app.get("/")
def root():
    return {"message": "Hello World", "s3": (S3_ENDPOINT, S3_ACCESS_KEY)}

@app.get("/photos/", response_model=List[schemas.Photo])
def read_photos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_photos(db, skip=skip, limit=limit)
    return users

@app.post("/create_photo/", response_model=schemas.Photo)
def create_photo(photo: schemas.Photo, db: Session = Depends(get_db)):
    return crud.create_photo(db=db, photo=photo)