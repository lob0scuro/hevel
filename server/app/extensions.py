from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_login import LoginManager

mongo = PyMongo()
cors = CORS()
login_manager = LoginManager()