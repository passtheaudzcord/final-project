from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from config import db  # Import db from config

class Ocean(db.Model, SerializerMixin):
    __tablename__ = "oceans"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    avg_depth = db.Column(db.String)
    deepest_point = db.Column(db.String)
    surface_area =db.Column(db.String)
    about = db.Column(db.String)
    ofun_fact = db.Column(db.String)
    img = db.Column(db.String)
    map = db.Column(db.String)

class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    scientific_name = (db.String)
    lifespan = db.Column(db.String)
    about = db.Column(db.String)
    fun_fact = db.Column(db.String)
    food = db.Column(db.String)
    img = db.Column(db.String)
    
# class Plant(db.Model, SerializerMixin):
    # __tablename__ = "plants"

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String)
    # scientific_name = (db.String)
    #lifespan = db.Column(db.Integer)
    # about = db.Column(db.String)
    # ocean_id = db.Column(db.Integer, db.ForeignKey('oceans.id'))
    # img = db.Column(db.String)

#class Habitat(db.Model, SerializerMixin):
    #__tablename__ = "habitats"
    #animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    #ocean_id = db.Column(db.Integer, db.ForeignKey('oceans.id'))


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)

    @validates('username')
    def validate_username(self, key, value):
        if len(value) < 4:
            raise ValueError('Username must be at least 4 characters long.')
        return value
    
    @validates('password')
    def validate_password(self, key, value):
        if len(value) < 5:
            raise ValueError('Password must be at least 5 characters long.')
        return value

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))