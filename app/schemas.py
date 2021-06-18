from typing import List, Optional

from pydantic import BaseModel

# common
class PhotoBase(BaseModel):
    filename: str
    caption: str 
    uploader: str
    attribution: str
    object_id: str
    # will also need date taken, date uploaded
    # if I want to allow edits and store the history a pointer to previous versions would be good

    class Config:
        schema_extra = {
            "example": {
                "filename": "DSC1002.JPG",
                "caption": "Rowers from across the country compete at the Head of the Charles Regatta on Saturday.",
                "uploader": "alyssaph",
                "attribution": "Alyssa P. Hacker",
                "object_id": "1bwdhjkj12blkjh1k2jbdikugasj234",
            }
        }

# for creating
class PhotoCreate(PhotoBase):
    pass

# for reading
class Photo(PhotoBase):
    pass

    class Config:
        orm_mode = True
