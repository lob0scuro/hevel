from flask import request, session, url_for, redirect, jsonify
from app.main import bp
from app.extensions import db
from app.models import User, Post, Category
from flask_login import current_user, login_required


@bp.route('/create_post', methods=('GET', 'POST'))
@login_required
def create_post():
    title = request.json('title')
    subtitle = request.json('subtitle')
    content = request.json('content')
    image_url = request.json('image_url')
    category = request.json('category')
    category_id = Category.query.filter_by(name=category).first()
    
    new_post = Post(title=title, subtitle=subtitle, content=content, image_url=image_url, author_id=current_user.id, category_id=category_id.id)
    
    try:
        db.session.add(new_post)
        db.session.commit()
        return jsonify(message = f"Successfully created post '{new_post.title}'")
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify(error = "Could not create post, check inputs and try again.")


@bp.route("/get_posts", methods=('GET', 'POST'))
def get_posts():
    posts = Post.query.all()
    post_list = [post.serialize() for post in posts]
    return jsonify(data = post_list)

@bp.route("/get_post/<int:id>", methods=('GET', 'POST'))
def get_post(id):
    post = Post.query.get(id)
    return jsonify(data = post.serialize())

@bp.route("/update_post/<int:id>", methods=('GET', 'POST'))
@login_required
def update_post(id):
    post = Post.query.get(id)
    title = request.json('title')
    subtitle = request.json('subtitle')
    content = request.json('content')
    image_url = request.json('image_url')
    updated_on = request.json('updated_on')
    category = request.json('category')
    
    try:
        post.title = title
        post.subtitle = subtitle
        post.content = content
        post.image_url = image_url
        post.created_on = updated_on
        post.category = category
        db.session.commit()
        return jsonify(message = f"Post '{post.title}' updated successfully")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        return jsonify(error = "Error in query, please try again")
    
@bp.route('/delete_post/<int:id>', methods=('GET', 'POST'))
@login_required
def delete_post(id):
    post = Post.query.get(id)
    try:
        db.session.delete(post)
        db.session.commit()
        return jsonify(message = "Successfully deleted post!")
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify(error = "Error in query, please try again")
        