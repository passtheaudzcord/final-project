from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from config import db, bcrypt  # Import db from config

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

    serialize_rules = ('-animal.favorites', )

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)


    @hybrid_property #getter
    def password_hash(self):
        raise AttributeError('password_hash is private')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

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
    
    serialize_rules = ('-user.favorites', )

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))

    users = db.relationship('User', back_populates ='favorite')
    animals = db.relationship('Animal', back_populates = 'favorite')

    serialize_rules = ('-user.favorites', '-animals.favorites', )
