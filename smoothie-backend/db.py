from bson import json_util, ObjectId
from pymongo.errors import DuplicateKeyError
from bson.errors import InvalidId
import uuid
from datetime import datetime
from flask import jsonify 

inventory_collection = None
sales_collection = None

def initialize_db(mongo):
    global inventory_collection, sales_collection
    inventory_collection = mongo.db.Inventory
    sales_collection = mongo.db.Sales

# Admin database helper functions
def add_product(product):
    try:
        inventory_collection.insert_one(product)
        return json_util.dumps({'success': True})
    except DuplicateKeyError:
        return json_util.dumps({'error': 'Product already exists'})

def get_all_products():
    products = list(inventory_collection.find({}))
    return json_util.dumps(products)


def update_product(product_data):
    try:
        product_id = product_data.pop('_id', None)
        
        # Handle error where '_id' is a dictionary -> extracts '$oid'
        if isinstance(product_id, dict) and '$oid' in product_id:
            product_id = product_id['$oid']
            
        if not product_id:
            return json_util.dumps({'error': 'Missing product _id'})

        result = inventory_collection.update_one({'_id': ObjectId(product_id)}, {'$set': product_data})
        if result.modified_count == 0:
            return json_util.dumps({'error': 'No document found with the provided _id'})

        return json_util.dumps({'success': True, 'modified_count': result.modified_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})


def delete_product(product_id):
    try:
        result = inventory_collection.delete_one({'_id': ObjectId(product_id)})
        return json_util.dumps({'deleted_count': result.deleted_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})

def get_inventory():
    inventory = list(inventory_collection.find({}, {'name': 1, 'quantity': 1, 'price': 1}))
    return json_util.dumps(inventory)

def get_sales():
    sales = list(sales_collection.find({}))
    print(sales)
    return json_util.dumps(sales)


# Customer database helper funcs
def update_inventory(product_id, quantity):
    try:
        result = inventory_collection.update_one(
            {'_id': ObjectId(product_id)},
            {'$inc': {'quantity': quantity}}
        )
        return json_util.dumps({'modified_count': result.modified_count})
    except InvalidId:
        return json_util.dumps({'error': 'Invalid product ID'})

def generate_transaction_id():
    return str(uuid.uuid4())

# Processes purchases 1 at a time.
def process_purchase(purchase_details):
    item_details = purchase_details['item']
    customer_info = purchase_details['customer_info']
    
    product = inventory_collection.find_one({'name': item_details['name']})
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    inventory_update = inventory_collection.update_one(
        {'_id': product['_id']},
        {'$inc': {'quantity': -item_details['quantity']}} 
    )
    
    if inventory_update.modified_count == 0:
        return jsonify({'error': 'Unable to update inventory'}), 400

    # Record the sale
    sale_record = {
        'product_id': str(product['_id']),
        'quantity': item_details['quantity'],
        'sale_price': item_details['price'],
        'transaction_id': generate_transaction_id(),
        'status': 'Completed',
        'customer_info': customer_info,
        'date_of_purchase': datetime.utcnow()
    }

    sales_collection.insert_one(sale_record)
    
    return jsonify({'success': True, 'message': 'Purchase processed'}), 200
