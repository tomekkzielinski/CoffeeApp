from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.models import Base, Product  # Upewnij się, że ścieżka importu jest poprawna

# Inicjalizacja aplikacji Flask
app = Flask(__name__)

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
    # Obsługujemy żądanie POST do dodawania nowego produktu.
    if request.method == 'POST':
        # Pobieramy dane przesłane w formacie JSON z żądania.
        data = request.json
        # Tworzymy nowy obiekt Product, wykorzystując dane z żądania.
        new_product = Product(name=data['name'], description=data['description'], price=data['price'], url=data['url'])
        # Dodajemy nowy produkt do sesji i zatwierdzamy zmiany, zapisując produkt w bazie danych.
        session.add(new_product)
        session.commit()
        # Zwracamy odpowiedź JSON, informującą o sukcesie operacji.
        return jsonify({'message': 'Product added successfully!'}), 201

@app.route('/products', methods=['GET'])
def get_products():
    # Tworzenie sesji bazy danych
    session = DBSession()
    # Pobieranie wszystkich produktów z bazy danych
    products = session.query(Product).all()
    # Zamiana listy produktów na format JSON
    return jsonify([{'name': product.name, 'description': product.description, 'price': product.price, 'url': product.url} for product in products])

# Uruchomienie aplikacji Flask
# W tej sekcji sprawdzamy, czy skrypt jest uruchamiany bezpośrednio (a nie importowany jako moduł).
# Jeśli tak, uruchamiamy serwer deweloperski Flask.
@app.route('/')
def hello():
    return "Witaj w API mojej aplikacji Flask!"

if __name__ == '__main__':
    app.run(debug=True)  # 'debug=True' uruchamia aplikację w trybie debugowania.
