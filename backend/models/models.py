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

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    session_id = Column(String, ForeignKey('cart.session_id'))
    total_price = Column(Float)
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer)
    order_id = Column(String) 

    # Relacje
    cart = relationship("Cart")
    product = relationship("Product")

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    