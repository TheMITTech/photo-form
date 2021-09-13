import os
import boto3
from typing import Optional, List
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from . import crud, models, schemas, storage
from .database import SessionLocal, engine

# models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# allow CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://photo-form.thetech.com",
    "http://photo-form.thetech.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/form", StaticFiles(directory="client/build"), name="client")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    with open("client/build/index.html", "r") as f:
        index_html = f.read()
    return HTMLResponse(content=index_html, status_code=200)
    # return {"message": "Hello World"}

@app.get("/photos", response_model=List[schemas.PhotoRead])
@app.get("/photos/", response_model=List[schemas.PhotoRead])
def read_photos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    photos = crud.get_photos(db, skip=skip, limit=limit)
    # TODO: Can I add this download url generation to the model itself somehow?
    for photo in photos:
        dl_url = storage.get_download_url(photo.get_obj_id())
        photo.download_url = dl_url
    return photos


@app.get("/photos_by_issue", response_model=List[schemas.PhotoRead])
@app.get("/photos_by_issue/", response_model=List[schemas.PhotoRead])
def read_photos_by_issue(volume: int, issue: int, db: Session = Depends(get_db)):
    photos = crud.get_photos_by_issue(db, volume, issue)
    for photo in photos:
        dl_url = storage.get_download_url(photo.get_obj_id())
        photo.download_url = dl_url
    return photos


@app.post("/create_photo", response_model=schemas.PhotoCreateResponse)
@app.post("/create_photo/", response_model=schemas.PhotoCreateResponse)
def create_photo(photo: schemas.PhotoCreate, db: Session = Depends(get_db)):
    db_photo = crud.create_photo(db=db, photo=photo)
    print(type(db_photo))
    # photo_obj = schemas.PhotoBase.parse_obj(photo)
    upload_url = storage.create_presigned_post(db_photo.get_obj_id())
    print("upload url", upload_url)
    db_photo.upload_url = upload_url
    return db_photo