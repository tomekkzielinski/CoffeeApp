from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base = declarative_base()
class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float)
    image = Column(String)  # Zmieniono z 'url' na 'image'
    category_id = Column(Integer, ForeignKey('categories.id'))

    # Relacja umożliwiająca odwołanie się do kategorii produktu
    category = relationship("Category")