from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

cors = CORS()
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()