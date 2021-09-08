import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base

class Photo(Base):
    __tablename__ = "photo_form"

    id = Column(Integer, primary_key=True, index=True)
    volume = Column(Integer)
    issue = Column(Integer)
    filename = Column(String, index=True)
    event_name = Column(String)
    department = Column(String)
    uploader = Column(String)
    attribution = Column(String)
    caption = Column(String, index=False)
    dt_uploaded = Column(DateTime, index=False, default=datetime.datetime.now())
    dt_taken = Column(DateTime)


    def get_obj_id(self) -> str:
        """
        constructs an object ID for the photo using the taken date, uploader kerb, and filename.
        TODO: It would probably be better to store this in the DB once it is computed, since the current
        method prevents any changes to this formula (or else references to old photos will be lost)

        returns: string
        """
        return f"{self.dt_taken.strftime('%Y%m%dT%H%M%S')}Z-{self.uploader}-{self.filename}"
