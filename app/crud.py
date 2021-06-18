from sqlalchemy.orm import Session

from . import models, schemas

def get_photos(db: Session, skip: int = 0, limit: int = 100):
    # offset and limit allow for pagination
    return db.query(models.Photo).offset(skip).limit(limit).all()


def create_photo(db: Session, photo: schemas.PhotoCreate):
    db_item = models.Photo(**photo.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item