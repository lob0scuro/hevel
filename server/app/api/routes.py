from flask import jsonify
from app.api import bp

@bp.route("/")
def index():
    return "index"