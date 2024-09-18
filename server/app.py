from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Resource, Api
import datetime
from models import db, Ocean, Animal, User, Favorite

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

class AllOceans(Resource):
    def get(self):
        pass

api.add_resource(AllOceans, '/oceans')

class AllAnimals(Resource):
    def get(self, id):
        pass

api.add_resource(AllAnimals, '/animals')