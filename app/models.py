from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    uploader = Column(String)
    attribution = Column(String)
    caption = Column(String, index=False)
    object_id = Column(String) # the reference to object storage, we will use the s3 api to get a url