import os
import boto3
from typing import Optional, List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from . import crud, models, schemas, storage
from .database import SessionLocal, engine

#models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/photos/", response_model=List[schemas.PhotoRead])
def read_photos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    photos = crud.get_photos(db, skip=skip, limit=limit)
    for photo in photos:
        dl_url = storage.get_download_url(photo.get_obj_id())
        photo.download_url = dl_url
    return photos

@app.post("/create_photo/", response_model=schemas.PhotoCreateResponse)
def create_photo(photo: schemas.PhotoCreate, db: Session = Depends(get_db)):
    db_photo = crud.create_photo(db=db, photo=photo)
    print(type(db_photo))
    # photo_obj = schemas.PhotoBase.parse_obj(photo)
    upload_url = storage.create_presigned_post(db_photo.get_obj_id())
    print("upload url", upload_url)
    db_photo.upload_url = upload_url
    return db_photo