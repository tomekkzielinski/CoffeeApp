from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.models import Base, User  # Załóżmy, że User to Twój model użytkownika
from werkzeug.security import generate_password_hash

# Konfiguracja silnika bazy danych
engine = create_engine('sqlite:///coffeeapp.db')  # Użyj swojego URL bazy danych
Base.metadata.bind = engine

Session = sessionmaker(bind=engine)
session = Session()

# Utwórz konto administratora
admin_user = User(
    username='admin',
    password_hash=generate_password_hash('admin')  # Ustaw silne hasło w produkcji!
)

# Dodaj administratora do bazy danych
session.add(admin_user)
session.commit()

print("Admin account created successfully.")
session.close()
