from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_login import LoginManager

db = PyMongo()
cors = CORS()
login_manager = LoginManager()