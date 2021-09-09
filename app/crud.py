from sqlalchemy.orm import Session
from typing import List, Tuple

from . import models, schemas

def get_photos(db: Session, skip: int = 0, limit: int = 100) -> List[models.Photo]:
    # offset and limit allow for pagination
    return db.query(models.Photo).order_by(models.Photo.id.desc()).offset(skip).limit(limit).all()


def get_photos_by_issue(db: Session, volume: int, issue: int) -> List[models.Photo]:
    return db.query(models.Photo).filter(models.Photo.volume == volume)\
        .filter(models.Photo.issue == issue).order_by(models.Photo.id.desc()).all() 


def create_photo(db: Session, photo: schemas.PhotoCreate) -> models.Photo:
    db_item = models.Photo(**photo.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item