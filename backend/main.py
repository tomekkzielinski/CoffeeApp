from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS
from backend.models.models import Base, Product, Cart, Order  # Załóżmy, że wszystkie modele są zdefiniowane w tym module
import random
# Inicjalizacja aplikacji Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Ustawiłem '*' dla origins, dla uproszczenia dostępu


# Konfiguracja silnika bazy danych SQLAlchemy
engine = create_engine('sqlite:///coffeeapp.db', echo=True)
Base.metadata.create_all(engine)  # Tworzenie tabel jeśli nie istnieją

# Konfiguracja sesji SQLAlchemy
Session = sessionmaker(bind=engine)

# Funkcja pomocnicza do zarządzania sesjami
def get_session():
    return Session()

def generate_order_id():
    # Generowanie losowego ID z zakresu 100-999
    random_id = random.randint(100, 999)
    return random_id

# Endpoint do dodawania produktów
@app.route('/products', methods=['POST'])
def add_product():
    session = get_session()
    try:
        data = request.json
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image=data['image'],
            category_id=data['category_id']
        )
        session.add(new_product)
        session.commit()
        return jsonify({'message': 'Product added successfully!'}), 201
    finally:
        session.close()

# Endpoint do pobierania wszystkich produktów
@app.route('/products', methods=['GET'])
def get_products():
    session = get_session()
    try:
        products = session.query(Product).all()
        result = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'image': product.image,
                'category_id': product.category_id
            } for product in products
        ]
        return jsonify(result)
    finally:
        session.close()

# Endpoint do usuwania produktu
@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    session = get_session()
    try:
        product = session.query(Product).filter_by(id=id).first()
        if product:
            session.delete(product)
            session.commit()
            return jsonify({'message': 'Product deleted successfully'}), 200
        else:
            return jsonify({'message': 'Product not found'}), 404
    finally:
        session.close()

# Endpoint do dodawania produktów do koszyka
@app.route('/cart', methods=['POST'])
def add_to_cart():
    session = get_session()
    try:
        data = request.json
        new_cart_item = Cart(
            product_id=data['product_id'],
            quantity=data['quantity'],
            session_id=data['session_id']
        )
        session.add(new_cart_item)
        session.commit()
        return jsonify({'message': 'Product added to cart successfully'}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing key {e}'}), 400
    finally:
        session.close()

# Endpoint do pobierania zawartości koszyka
@app.route('/cart', methods=['GET'])
def get_cart_contents():
    session = get_session()
    try:
        cart_items = session.query(Cart).all()
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
        return jsonify(cart_data)
    finally:
        session.close()

# Endpoint do usuwania produktu z koszyka
@app.route('/cart/<int:cart_id>', methods=['DELETE'])
def remove_from_cart(cart_id):
    session = get_session()
    try:
        cart_item = session.query(Cart).filter_by(id=cart_id).first()
        if cart_item:
            session.delete(cart_item)
            session.commit()
            return jsonify({'message': 'Item removed from cart'}), 200
        else:
            return jsonify({'message': 'Item not found in cart'}), 404
    finally:
        session.close()

@app.route('/orders', methods=['POST'])
def add_order():
    session = get_session()
    try:
        data = request.get_json()
        session_id = data.get('session_id')

        if not session_id:
            return jsonify({'error': 'Missing session_id'}), 400

        cart_items = session.query(Cart).filter_by(session_id=session_id).all()
        
        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400

        orders = []
        for cart_item in cart_items:
            product = session.query(Product).filter_by(id=cart_item.product_id).first()
            new_order = Order(
                order_id = format(generate_order_id()),
                session_id=data['session_id'],
                product_id=cart_item.product_id,
                quantity=cart_item.quantity,
                total_price=data['amount']
            )
            orders.append(new_order)
        
        session.add_all(orders)
        session.query(Cart).filter_by(session_id=session_id).delete()
        session.commit()

        # Generowanie nowego session_id po złożeniu zamówienia
        new_session_id = generate_session_id()
        
        return jsonify({
            'message': 'Order added successfully', 
            'order_ids': [order.order_id for order in orders],
            'new_session_id': new_session_id
        }), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()



# # Endpoint do dodawania zamówień
# @app.route('/orders', methods=['POST'])
# def add_order():
#     session = get_session()
#     try:
#         data = request.get_json()
#         new_order = Order(
#             session_id=data['session_id'],
#             total_price=data['total_price']
#         )
#         session.add(new_order)
#         session.commit()
#         return jsonify({'message': 'Order added successfully', 'order_id': new_order.id}), 201
#     except Exception as e:
#         session.rollback()
#         return jsonify({'error': str(e)}), 400
#     finally:
#         session.close()


# Endpoint powitalny
@app.route('/')
def hello():
    return "Welcome to the Flask API!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
