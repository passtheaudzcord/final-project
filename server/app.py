from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Resource, Api
import datetime
from models import Ocean, Animal, User, Favorite
from config import db, api

class AllOceans(Resource):
    def get(self):
        oceans = Ocean.query.all()
        oceans_list = [ocean.to_dict(only=('id', 'name', 'avg_depth', 'deepest_point', 'surface_area', 'about', 'ofun_fact', 'img', 'map')) for ocean in oceans]
        return make_response(oceans_list, 200)
    
api.add_resource(AllOceans, '/oceans')

class AllAnimals(Resource):
    def get(self):
        animals = Animal.query.all()
        animals_list = [animal.to_dict(only=('id', 'name', 'scientific_name', 'lifespan', 'about', 'fun_fact', 'food', 'img' )) for animal in animals]
        return make_response(animals_list, 200)

api.add_resource(AllAnimals, '/animals')

class AllUsers(Resource):
    def get(self):
        users = User.query.all()
        return make_response([{'id': user.id, 'username': user.username} for user in users], 200)
          
api.add_resource(AllUsers, '/users')

class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        return make_response({'id': user.id, 'username': user.username}, 200)

    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'], password_hash=data['password'])
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
        favorites_list = [fav.to_dict(only=('id', 'user_id', 'animal_id' )) for fav in favs]
        return make_response(favorites_list, 200)

api.add_resource(AllFavorites, '/favorites')

if __name__ == "__main__":
    app.run(port=5555, debug=True)