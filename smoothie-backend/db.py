from bson import json_util, ObjectId
import bson
from flask_pymongo import PyMongo
from pymongo.errors import DuplicateKeyError
from bson.errors import InvalidId

inventory_collection = None
sales_collection = None

def initialize_db(mongo):
    global inventory_collection, sales_collection
    inventory_collection = mongo.db.Inventory
    sales_collection = mongo.db.Sales

def add_product(product):
    try:
        inventory_collection.insert_one(product)
        return json_util.dumps({'success': True})
    except DuplicateKeyError:
        return json_util.dumps({'error': 'Product already exists'})

def get_all_products():
    products = list(inventory_collection.find({}))
    return json_util.dumps(products)

def update_product(product):
    try:
        result = inventory_collection.update_one({'_id': ObjectId(product['_id'])}, {'$set': product})
        return json_util.dumps({'modified_count': result.modified_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})

def delete_product(product_id):
    try:
        result = inventory_collection.delete_one({'_id': ObjectId(product_id)})
        return json_util.dumps({'deleted_count': result.deleted_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})

def get_inventory():
    inventory = list(inventory_collection.find({}, {'name': 1, 'quantity': 1}))
    return json_util.dumps(inventory)

def get_sales():
    sales = list(sales_collection.find({}))
    return json_util.dumps(sales)

def update_inventory(product_id, quantity):
    try:
        result = inventory_collection.update_one(
            {'_id': ObjectId(product_id)},
            {'$inc': {'quantity': quantity}}
        )
        return json_util.dumps({'modified_count': result.modified_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})

def process_purchase(purchase_details):
    try:
        product_id = ObjectId(purchase_details['product_id'])
        quantity = purchase_details['quantity']
        inventory_update = inventory_collection.update_one(
            {'_id': product_id, 'quantity': {'$gte': quantity}},
            {'$inc': {'quantity': -quantity}}
        )
        if inventory_update.modified_count == 0:
            return json_util.dumps({'error': 'Missing stock or wrong product ID'})
        sale_record = {
            'product_id': product_id,
            'quantity': quantity,
        }
        sales_collection.insert_one(sale_record)
        return json_util.dumps({'success': 'Purchase processed'})
    except (InvalidId, KeyError):
        return json_util.dumps({'error': 'Invalid input data'})
