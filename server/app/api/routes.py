from flask import jsonify, request
from app.api import bp
from app.extensions import mongo
from bson import ObjectId
from datetime import datetime
import pytz


@bp.route("/login", methods=('GET', 'POST'))
def login():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        queryUser = mongo.db.users.find_one({"username": username})
        if not queryUser:
            print("User not found")
            return jsonify(error="User not found"), 404
        userPass = queryUser["password"]
        if password != userPass:
            print(f"Passwords do not match: password entered = {password}")
            print(f"User password = {userPass}")
            return jsonify(error="Invalid crediential"), 401
        queryUser["_id"] = str(queryUser["_id"])
        return jsonify(user=queryUser), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="There was an error, please try again"), 500

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
    
    cst = pytz.timezone("America/Chicago")
    format_date = datetime.now(cst).strftime("%a %b %d %Y")
    
    
    #insert into posts collection of the hevel database and get the post id
    post_id = mongo.db.posts.insert_one({"title": title, "subtitle": subtitle, "content": content, "category": category, "created_on": format_date}).inserted_id
    
    #return success message upon completion, probably should put all this into a try, catch block.... for future date.
    return jsonify(message="Post created successfully", post_id= str(post_id)), 201


#route for deleting post by id
@bp.route("/delete/<id>", methods=['DELETE'])
def delete(id):
    try:
        post = mongo.db.posts.delete_one({"_id": ObjectId(id)})
        if post.deleted_count == 0:
            return jsonify(error=f"Could not locate post with id: {id}"), 404
        
        return jsonify("Post has been deleted"), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Problem with server, please try again"), 500

#route for getting all posts
@bp.route("/get-posts", methods=['GET'])
def get_posts():
    try:
        posts = [
            {**post, "_id": str(post["_id"])} for post in mongo.db.posts.find().sort("_id", -1)
        ]
        if not posts:
            return jsonify(error="Could not find posts"), 404
        return jsonify(posts), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Error when querying for posts, please try again"), 500
    
    
# get a single post
@bp.route("/get-post/<id>", methods=['GET'])
def get_post(id):
    try:
        post = mongo.db.posts.find_one({"_id": ObjectId(id)})
        if not post:
            return jsonify(error = "Could not find post, check inputs and try again"), 404
        post["_id"] = str(post["_id"])
        return jsonify(post), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Problem with query, please try again"), 500
    
@bp.route("/get-posts-by-category/<category>", methods=['GET'])
def get_post_by_category(category):
    try:
        posts = [
            {**post, "_id": str(post["_id"])} for post in mongo.db.posts.find({"category": category})
        ]
        
        return jsonify(posts)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error = f"Error: {e}"), 500
    
# edit a post
@bp.route("/edit-post/<id>", methods=['PATCH', 'PUT'])  # Accepts both methods
def edit_post(id):
    try:
        data = request.get_json()
        if not data:
            return jsonify(error="No data provided"), 400

        result = mongo.db.posts.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}  # Updates only the fields provided
        )

        if result.matched_count == 0:
            return jsonify(error=f"Could not locate post with id: {id}"), 404

        return jsonify(message="Post has been updated"), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error="Problem with server, please try again"), 500