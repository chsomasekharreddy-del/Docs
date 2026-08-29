from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db

SQLALCHEMY_DATABASE_URL = 'sqlite:///:memory:'
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={'check_same_thread': False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_root():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Welcome to HealthSage'}

def test_create_user():
    user_data = {
        'username': 'johndoe',
        'email': 'JohnDoe@Example.com',
        'password': 'password123'
    }
    response = client.post('/users', json=user_data)
    assert response.status_code == 201
    data = response.json()
    assert data['username'] == 'johndoe'
    assert data['email'] == 'johndoe@example.com'
    assert 'id' in data

def test_create_user_duplicate_email():
    response = client.post('/users', json={
        'username': 'unique_user',
        'email': 'johndoe@example.com',
        'password': 'password123'
    })
    assert response.status_code == 409
    assert response.json()['detail'] == 'Email already registered!'

def test_create_user_duplicate_username():
    response = client.post('/users', json={
        'username': 'johndoe',
        'email': 'different@example.com',
        'password': 'password123'
    })
    assert response.status_code == 409
    assert response.json()['detail'] == 'Username is already taken!'

def test_create_user_short_password():
    response = client.post('/users', json={
        'username': 'shortpass',
        'email': 'short@example.com',
        'password': '123'
    })
    assert response.status_code == 422

def test_login_success_with_email():
    response = client.post('/auth/login', data={
        'username': 'johndoe@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    data = response.json()
    assert 'access_token' in data
    assert data['token_type'] == 'bearer'

def test_login_success_with_username():
    response = client.post('/auth/login', data={
        'username': 'johndoe',
        'password': 'password123'
    })
    assert response.status_code == 200
    data = response.json()
    assert 'access_token' in data
    assert data['token_type'] == 'bearer'

def test_login_wrong_password():
    response = client.post('/auth/login', data={
        'username': 'johndoe',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert response.headers.get('www-authenticate') == 'Bearer'
    assert response.json()['detail'] == 'Invalid credentials'

def test_login_non_existent_user():
    response = client.post('/auth/login', data={
        'username': 'nonexistent',
        'password': 'password123'
    })
    assert response.status_code == 401
    assert response.headers.get('www-authenticate') == 'Bearer'
    assert response.json()['detail'] == 'Invalid credentials'

def test_get_current_user_me():
    login_res = client.post('/auth/login', data={
        'username': 'johndoe',
        'password': 'password123'
    })
    token = login_res.json()['access_token']
    response = client.get('/users/me', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert response.json()['username'] == 'johndoe'

def test_get_current_user_me_unauthorized():
    response = client.get('/users/me')
    assert response.status_code == 401

def test_get_current_user_me_invalid_token():
    response = client.get('/users/me', headers={'Authorization': 'Bearer invalidtoken'})
    assert response.status_code == 401

def test_get_user_by_id():
    login_res = client.post('/auth/login', data={
        'username': 'johndoe',
        'password': 'password123'
    })
    token = login_res.json()['access_token']
    user_res = client.get('/users/1', headers={'Authorization': f'Bearer {token}'})
    assert user_res.status_code == 200
    assert user_res.json()['id'] == 1

def test_get_user_by_id_not_found():
    login_res = client.post('/auth/login', data={
        'username': 'johndoe',
        'password': 'password123'
    })
    token = login_res.json()['access_token']
    user_res = client.get('/users/9999', headers={'Authorization': f'Bearer {token}'})
    assert user_res.status_code == 404

def test_cors_headers():
    response = client.options('/users', headers={
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST'
    })
    assert response.headers.get('access-control-allow-origin') == 'http://localhost:3000'
    assert response.headers.get('access-control-allow-credentials') == 'true'
