from flask import Flask
from config import Config
from app.extensions import db, cors, login_manager

def create_app(test_config=Config):
    app = Flask(__name__)
    app.config.from_object(test_config)
    
    db.init_app(app)
    cors.init_app(app)
    login_manager.init_app(app)
    
    
    from app.api import bp
    app.register_blueprint(bp)

    
    @app.route("/test")
    def test():
        return "Success!"
        
    return app
    