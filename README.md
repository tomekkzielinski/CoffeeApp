# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



### Backend

3.bedac w glownym katalogu
python -m backend.main

4.instalacja flaska
pip install flask
pip install flask-login

5. Instalacja sqlalchemy
pip install sqlalchemy

6. Instalacja Flask-Cors
pip install flask-cors

7. dodanie Alembic - narzedzie do migracji baz danych
pip install alembic
alembic init alembic

8. migracja bazy
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

