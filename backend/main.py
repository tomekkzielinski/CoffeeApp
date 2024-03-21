from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.models import Base, Product  # Upewnij się, że ścieżka importu jest poprawna
from flask_cors import CORS
from backend.models.models import Base, Product, Cart


# Inicjalizacja aplikacji Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Konfiguracja silnika bazy danych SQLAlchemy
# Tutaj tworzymy silnik bazy danych, który wskazuje na plik SQLite 'coffeeapp.db' w katalogu głównym projektu.
# 'echo=True' pozwala na logowanie wszystkich generowanych zapytań SQL, co jest przydatne do debugowania.
engine = create_engine('sqlite:///coffeeapp.db', echo=True)

# Tworzenie tabel w bazie danych
# Ta linia kodu łączy nasz silnik bazy danych z metadanymi naszych modeli (zdefiniowanych w SQLAlchemy)
# i tworzy wszystkie tabele, które są zdefiniowane, ale jeszcze nie istnieją w bazie danych.
Base.metadata.create_all(engine)

# Konfiguracja sesji SQLAlchemy
# Sesje są używane do zarządzania operacjami na bazie danych (takimi jak dodawanie nowych rekordów).
DBSession = sessionmaker(bind=engine)
session = DBSession()

# Definicja endpointu API do dodawania nowych produktów

@app.route('/products', methods=['POST'])
def add_product():
    if request.method == 'POST':
        data = request.json
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image=data['image'],
            category_id=data['category_id']  # Upewnij się, że tutaj również oczekujesz 'category_id'
        )
        session.add(new_product)
        session.commit()
        return jsonify({'message': 'Product added successfully!'}), 201


@app.route('/products', methods=['GET'])
def get_products():
    # Pobranie wszystkich produktów z bazy danych
    products = session.query(Product).all()
    # Zamiana listy produktów na format JSON
    return jsonify([{
        'id' : product.id,
        'name': product.name, 
        'description': product.description, 
        'price': product.price, 
        'image': product.image,
        'category_id': product.category_id
    } for product in products])

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    session = DBSession()
    product = session.query(Product).filter_by(id=id).first()
    if product:
        session.delete(product)
        session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    else:
        return jsonify({'message': 'Product not found'}), 404

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    print(data)  # Dodaj to, aby zobaczyć przychodzące dane.
    try:
        new_cart_item = Cart(
            product_id=data['product_id'],
            quantity=data['quantity']
        )
        session.add(new_cart_item)
        session.commit()
        return jsonify({'message': 'Product added to cart successfully'}), 201
    except KeyError as e:
        print(f"KeyError: Missing key {e}")
        return jsonify({'error': f'Missing key {e}'}), 400

@app.route('/cart', methods=['GET'])
def get_cart_contents():
    # Tworzenie sesji bazy danych
    session = DBSession()

    # Pobieranie wszystkich wpisów z koszyka z bazy danych
    cart_items = session.query(Cart).all()

    # Przygotowanie danych do odpowiedzi, w tym pobranie szczegółów produktów
    cart_data = []
    for item in cart_items:
        product = session.query(Product).filter_by(id=item.product_id).first()
        cart_data.append({
            'cart_id': item.id,
            'product_id': item.product_id,
            'quantity': item.quantity,
            'product_name': product.name,
            'product_description': product.description,
            'product_price': product.price,
            'product_image': product.image,
            'category_id': product.category_id
        })

    # Zamykanie sesji
    session.close()

    # Zwracanie danych w formacie JSON
    return jsonify(cart_data)

# Uruchomienie aplikacji Flask
# W tej sekcji sprawdzamy, czy skrypt jest uruchamiany bezpośrednio (a nie importowany jako moduł).
# Jeśli tak, uruchamiamy serwer deweloperski Flask.
@app.route('/')
def hello():
    return "Witaj w API mojej aplikacji Flask!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
