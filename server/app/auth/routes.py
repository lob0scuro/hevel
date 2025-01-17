from flask import request, jsonify
from app.extensions import db
from app.auth import bp
from app.models import User
from flask_login import login_user, logout_user, login_required

@bp.route('/register_new_user', methods=('GET', 'POST'))
def register_new_user():
    first_name = request.json('first_name')
    last_name = request.json('last_name')
    username = request.json('username')
    password = request.json('password')
    password_check = request.json('password_check')
    email = request.json('email')
    
    check_user = User.query.filter_by(username=username).first()
    if check_user:
        return jsonify(error = "username already in use, please try anoher")
    if password != password_check:
        return jsonify(error = "Passwords do not match, please check spelling and try again")
    check_email = User.query.filter_by(email=email).first()
    if check_email:
        return jsonify(error="Email already in use")
    new_user = User(first_name=first_name, last_name=last_name, username=username, email=email)
    new_user.set_password(password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify(error = "could not create new user, check inputs and try again")
    
    
@bp.route("/login", methods=('GET', 'POST'))
def login():
    username = request.json('username')
    password = request.json('password')
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify(message = "Login Successful!")
    else:
        return jsonify(error = "Username or password incorrect, please try again")
    
    
    
@bp.route('/logout', methods=('GET', 'POST'))
@login_required
def logout():
    logout_user()
    return jsonify(message = "logout successful")