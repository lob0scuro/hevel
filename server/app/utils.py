from app.models import Category
from app.extensions import db

def seed_categories():
        categories = ["Religion", "Science", "Lifestyle", "Craftsmanship", "Education", "Music", "Art", "Health", "Entertainment", "Misc."]
        for category_name in categories:
            if not Category.query.filter_by(name=category_name).first():
                category = Category(name=category_name)
                db.session.add(category)
        db.session.commit()