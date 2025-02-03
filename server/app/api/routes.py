from flask import jsonify, request
from app.api import bp
from app.extensions import mongo

@bp.route("/create-post", methods=('GET', 'POST'))
def create_post():
    #Get POST request json data
    data = request.get_json()
    #extract the different fields
    title = data.get('title')
    subtitle = data.get('subtitle')
    content = data.get('content')
    category = data.get('category')
    
    #check to make sure at least the title and content is present
    if not title or not content:
        return jsonify(error="Posts must have a title and content"), 400
    
    #insert into posts collection of the hevel database and get the post id
    post_id = mongo.db.posts.insert_one({"title": title, "subtitle": subtitle, "content": content, "category": category}).inserted_id
    
    #return success message upon completion, probably should put all this into a try, catch block.... for future date.
    return jsonify(message="Post created successfully", post_id= str(post_id)), 201
    
