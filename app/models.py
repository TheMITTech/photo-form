from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    uploader = Column(String)
    attribution = Column(String)
    caption = Column(String, index=False)
    dt_uploaded = Column(DateTime, index=False)
    dt_taken = Column(DateTime)


    def get_obj_id(self) -> str:
        """
        constructs an object ID for the photo using the taken date, uploader kerb, and filename

        returns: string
        """
        return f"{self.dt_taken.strftime('%Y%m%dT%H%M%S')}Z-{self.uploader}-{self.filename}"
