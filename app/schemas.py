from typing import List, Optional

from pydantic import BaseModel, HttpUrl

from datetime import datetime

from . import storage



class S3UploadInfo(BaseModel):
    url: HttpUrl
    fields: dict

# common
class PhotoBase(BaseModel):
    filename: str
    caption: str 
    uploader: str
    attribution: str
    dt_uploaded: datetime # must be UTC
    dt_taken: datetime # must be UTC

    # if I want to allow edits and store the history a pointer to previous versions would be good

    class Config:
        schema_extra = {
            "example": {
                "filename": "DSC1002.JPG",
                "caption": "Rowers from across the country compete at the Head of the Charles Regatta on Saturday.",
                "uploader": "alyssaph",
                "attribution": "Alyssa P. Hacker",
                "dt_uploaded": "2021-06-18T12:57:17Z",
                "dt_taken": "2021-06-17T11:05:12Z",
            }
        }
        orm_mode = True

class PhotoCreate(PhotoBase):
    # for creating new photos - client will submit data in this form
    pass

class PhotoRead(PhotoBase):
    # need to manually set url
    download_url: HttpUrl
    class Config:
        orm_mode = True

class PhotoCreateResponse(PhotoBase):
    # need to manually set url
    upload_url: Optional[S3UploadInfo]

# these do not work, but it would be really nice if they did. check
#     https://github.com/samuelcolvin/pydantic/issues/935 and
#     https://github.com/samuelcolvin/pydantic/pull/2625 for status updates.
# class PhotoCreateResponse(PhotoBase):
#     # generate the presigned upload url on the fly to return to the client
#     upload_url: HttpUrl = storage.create_presigned_post(self.get_obj_id())

# # for reading
# class PhotoRead(PhotoBase):
#     # include the s3 download url to send to the client
#     download_url: HttpUrl = storage.get_download_url(self.get_obj_id())

#     class Config:
#         orm_mode = True