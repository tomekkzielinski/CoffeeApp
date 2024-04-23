from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask_login import UserMixin

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
    session_id = Column(String)
    quantity = Column(Integer, default=1)
    milk = Column(Boolean, default=False)  # New field for milk
    sugar = Column(Boolean, default=False)  # New field for sugar
    # Relacje
    product = relationship("Product", back_populates="carts")
    
Product.carts = relationship("Cart", back_populates="product")

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    session_id = Column(String, ForeignKey('cart.session_id'))
    total_price = Column(Float)
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer)
    order_id = Column(String) 
    milk = Column(Boolean, default=False)  # Dodane pole dla mleka
    sugar = Column(Boolean, default=False)  # Dodane pole dla cukru

    # Relacje
    cart = relationship("Cart")
    product = relationship("Product")

class User(UserMixin, Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # Metody wymagane przez Flask-Login
    @property
    def is_authenticated(self):
        # Zwykle zwraca True, jeśli użytkownik dostarczył prawidłowe dane uwierzytelniające
        return True

    @property
    def is_active(self):
        # Zwykle zwraca True, o ile konto użytkownika jest aktywne, a nie zawieszone
        return True

    @property
    def is_anonymous(self):
        # Zwykle zwraca False - tylko dla specjalnych anonimowych użytkowników
        return False

    def get_id(self):
        # Zwraca unikatowy identyfikator użytkownika, musi być unicode
        return str(self.id)

    