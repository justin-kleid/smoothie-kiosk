
import bson

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo

from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId

def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:

        db = g._database = PyMongo(current_app).db
       
    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)


# Interacting with database
def add_product(product):
    pass

def get_all_products():
    pass

def update_product(product):
    pass

def delete_product(product_id):
    pass

def get_inventory():
    pass

def get_sales():
    pass

def process_purchase(purchase_details):
    pass