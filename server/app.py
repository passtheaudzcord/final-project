from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from models import Ocean, Animal, User, Favorite
from config import db, api, app
from werkzeug.exceptions import NotFound, UnprocessableEntity
from flask_login import current_user, login_user, logout_user, LoginManager, login_required

@app.before_request
def before_request():
    print('Session before request:', session)

@app.after_request
def after_request(response):
    print('Session after request:', session.get('user_id'))
    return response

@app.route('/')
def index():
    return '<h1>Hello World!</h1>'

class RegisterForm(Resource):
    def post(self):
        data = request.get_json()
        if not data or not data.get('username') or not data.get('password'):
            return make_response({'message': 'Username and password required'}, 400)
        
        new_user = User(username=data['username'])
        new_user.password = data['password']
        print(new_user.__dict__)
        try:
            db.session.add(new_user)
            db.session.commit()
            print(session)
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            print(str(e))
            return make_response({'message': str(e)}, 422)
        

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            cur_user = User.query.get(user_id)
            return make_response(cur_user.to_dict(), 200)
        return make_response({'message': 'No one is logged in'}, 200)

class Login(Resource):
    
    def post(self):
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password'):
            return make_response({'message': 'Username and password required'}, 400)

        user = User.query.filter_by(username=data.get('username')).first()

        if not user:
            return make_response({'message': 'No user with that username'}, 401)
       

# Register the Login resource with the API
api.add_resource(Login, '/login', endpoint='login')

@app.route('/current_user', methods=['GET'])
def current_user():
    # Check if the user is logged in
    if 'user_id' in session:
        user_id = session['user_id']
        # Fetch user from the database based on user_id
        user = User.query.get(user_id)  # Assuming you have a User model
        if user:
            return jsonify({'user': user.to_dict()}), 200  # Ensure to_dict() method exists
    return jsonify({'user': None}), 404  # User not found or not logged in
        
class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response({'message': 'User logged out'}, 200)

class AllOceans(Resource):
    def get(self):
        oceans = Ocean.query.all()
        oceans_list = [ocean.to_dict(only=('id', 'name', 'avg_depth', 'deepest_point', 'surface_area', 'about', 'ofun_fact', 'img', 'map')) for ocean in oceans]
        return make_response(oceans_list, 200)

api.add_resource(AllOceans, '/oceans')

@app.route('/oceans/<int:id>', methods=["GET"])
def one_ocean(id):
    ocean = Ocean.query.get(id)
    if not ocean:
        raise NotFound('Ocean not found')
    return make_response(ocean.to_dict(), 200)

@app.route('/animals/<int:id>', methods=["GET", "DELETE", "PATCH"])
def one_animal(id):
    animal = Animal.query.get(id)
    
    if request.method == 'GET':
        if not animal:
            raise NotFound('Animal not found')
        return make_response(animal.to_dict(), 200)

    if request.method == "DELETE":
        if not animal:
            raise NotFound('Animal not found')
        db.session.delete(animal)
        db.session.commit()
        return make_response('', 204)

    if request.method == "PATCH":
        if not animal:
            raise NotFound('Animal not found')
        
        data = request.get_json()
        
        # Update the animal's attributes based on provided data
        if 'name' in data:
            animal.name = data['name']
        if 'scientific_name' in data:
            animal.scientific_name = data['scientific_name']
        if 'lifespan' in data:
            animal.lifespan = data['lifespan']
        if 'about' in data:
            animal.about = data['about']
        if 'fun_fact' in data:
            animal.fun_fact = data['fun_fact']
        if 'food' in data:
            animal.food = data['food']
        if 'img' in data:
            animal.img = data['img']
        if 'ocean' in data:
            ocean_instance = Ocean.query.get(data['ocean'])
            if ocean_instance:
                animal.ocean = ocean_instance  # Update the ocean if provided
        
        db.session.commit()
        return make_response(animal.to_dict(), 200)

class AllAnimals(Resource):
    def get(self):
        # Retrieve all animals from the database
        animals = Animal.query.all()
        animals_list = [
            animal.to_dict(only=('id', 'name', 'scientific_name', 'lifespan', 'about', 'fun_fact', 'food', 'img')) 
            for animal in animals
        ]
        return make_response(animals_list, 200)

    def post(self):
        # Get the JSON data from the request
        data = request.get_json()
        ocean_id = data.get('ocean')

        ocean_instance = Ocean.query.get(ocean_id)
        if not ocean_instance:
            return make_response({'error': 'Ocean not found'}, 400)  # Use make_response here

        # Create a new Animal object with the provided data
        new_animal = Animal(
            name=data['name'],
            scientific_name=data['scientific_name'],
            lifespan=data['lifespan'],
            about=data['about'],
            fun_fact=data['fun_fact'],
            food=data['food'],
            img=data['img'],
            ocean=ocean_instance 
        )

        # Add the new animal to the database
        db.session.add(new_animal)
        db.session.commit()
        return make_response({'id': new_animal.id}, 201)
api.add_resource(AllAnimals, '/animals')

class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        return make_response({'id': user.id, 'username': user.username}, 200)

    def post(self):
        data = request.get_json()
        if not data or not data.get('username') or not data.get('password'):
            return make_response({'message': 'Username and password required'}, 400)
        
        new_user = User(username=data['username'], password_hash=generate_password_hash(data['password']))
        db.session.add(new_user)
        db.session.commit()
        return make_response({'id': new_user.id}, 201)

    def patch(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return make_response({'id': user.id}, 200)

    def delete(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response('', 204)

api.add_resource(UserResource, '/users/<int:id>')

class AllFavorites(Resource):
    def get(self):
        favs = Favorite.query.all()
        favorites_list = [fav.to_dict(only=('id', 'user_id', 'animal_id')) for fav in favs]
        return make_response(favorites_list, 200)

    def post(self):
        data = request.get_json()  # Get the JSON data from the request
        user_id = data.get('user_id')
        animal_id = data.get('animal_id')

        if not user_id or not animal_id:
            return make_response({"error": "user_id and animal_id are required."}, 400)

        # Create a new Favorite entry
        new_favorite = Favorite(user_id=user_id, animal_id=animal_id)
        db.session.add(new_favorite)
        db.session.commit()

        return make_response(new_favorite.to_dict(), 201)

api.add_resource(AllFavorites, '/favorites', endpoint='favorites')
api.add_resource(RegisterForm, '/register', endpoint='register')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == "__main__":
    app.run(port=5555, debug=True)