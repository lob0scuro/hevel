from flask import jsonify, request
from app.api import bp
from app.extensions import mongo
from bson import ObjectId
from datetime import date


# Route for creating posts
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
    post_id = mongo.db.posts.insert_one({"title": title, "subtitle": subtitle, "content": content, "category": category, "created_on": date.today()}).inserted_id
    
    #return success message upon completion, probably should put all this into a try, catch block.... for future date.
    return jsonify(message="Post created successfully", post_id= str(post_id)), 201
    

#route for getting all posts
@bp.route("/get-posts", methods=['GET'])
def get_posts():
    try:
        posts = [
            {**post, "_id": str(post["_id"])} for post in mongo.db.posts.find()
        ]
        if not posts:
            return jsonify(error="Could not find posts")
        return jsonify(posts)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Error when querying for posts, please try again")
    
    
# get a single post
@bp.route("/get-post/<id>", methods=['GET'])
def get_post(id):
    try:
        post = mongo.db.posts.find_one({"_id": ObjectId(id)})
        if not post:
            return jsonify(error = "Could not find post, check inputs and try again"), 400
        post["_id"] = str([post["_id"]])
        return jsonify(post)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Problem with query, please try again")
    
    