from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db  # Import db from config

class Ocean(db.Model, SerializerMixin):
    __tablename__ = "oceans"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    avg_depth = db.Column(db.String)
    deepest_point = db.Column(db.String)
    surface_area = db.Column(db.String)
    about = db.Column(db.String)
    ofun_fact = db.Column(db.String)  # Corrected name
    img = db.Column(db.String)
    map = db.Column(db.String)

    # Relationship to Animal
    animals = db.relationship('Animal', back_populates='ocean')  # Use back_populates

class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    scientific_name = db.Column(db.String)
    lifespan = db.Column(db.String)
    about = db.Column(db.String)
    fun_fact = db.Column(db.String)
    food = db.Column(db.String)
    img = db.Column(db.String)
    
    # Foreign key to Ocean
    ocean_id = db.Column(db.Integer, db.ForeignKey('oceans.id'))

    # Relationships
    favorites = db.relationship('Favorite', back_populates='animal')
    ocean = db.relationship('Ocean', back_populates='animals')  # Use back_populates

    serialize_rules = ('-favorites',)  # Adjusted to reflect correct relationships

    

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # Relationships
    favorites = db.relationship('Favorite', back_populates='user')

    serialize_rules = ('-favorites',)

    # Username validation
    @validates('username')
    def validate_username(self, key, value):
        if len(value) < 4:
            raise ValueError('Username must be at least 4 characters long.')
        return value

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))

    user = db.relationship('User', back_populates='favorites')
    animal = db.relationship('Animal', back_populates='favorites')

    serialize_rules = ('-user.favorites', '-animal.favorites',)