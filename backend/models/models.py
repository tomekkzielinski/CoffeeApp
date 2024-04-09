from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    image = Column(String)  # Zmieniono z 'url' na 'image'
    category_id = Column(Integer, ForeignKey('categories.id'))
    


    # Relacja umożliwiająca odwołanie się do kategorii produktu
    category = relationship("Category")

class Cart(Base):
    __tablename__ = 'cart'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'))
    # user_id = Column(Integer, ForeignKey('users.id')) # Jeśli masz model User
    session_id = Column(String)
    quantity = Column(Integer, default=1)
    # Można dodać więcej pól, np. status koszyka, datę dodania itp.

    # Relacje
    product = relationship("Product", back_populates="carts")
    # user = relationship("User", back_populates="carts") # Jeśli masz model User
    
Product.carts = relationship("Cart", back_populates="product")