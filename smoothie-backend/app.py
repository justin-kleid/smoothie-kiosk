from flask import Flask, request, Response
from flask_pymongo import PyMongo
import os
import configparser
from db import initialize_db, add_product, get_all_products, update_product, delete_product, get_inventory, get_sales, process_purchase
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
# Load config
config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))
app.config["MONGO_URI"] = config['PROD']['DB_URI']

# Initialize PyMongo with app
mongo = PyMongo(app)
initialize_db(mongo)

# Admin Routes
@app.route('/admin/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_products():
    if request.method == 'POST':
        product = request.json
        return add_product(product)
    elif request.method == 'GET':
        products = get_all_products()
        return Response(products, mimetype='application/json')
    elif request.method == 'PUT':
        product = request.json
        return update_product(product)
    elif request.method == 'DELETE':
        product_id = request.args.get('id')
        return delete_product(product_id)

@app.route('/admin/inventory', methods=['GET'])
def view_inventory():
    inventory = get_inventory()
    return Response(inventory, mimetype='application/json')

@app.route('/admin/sales', methods=['GET'])
def view_sales():
    sales = get_sales()
    return Response(sales, mimetype='application/json')

# Customer Routes
@app.route('/products', methods=['GET'])
def get_products():
    products = get_all_products()
    return Response(products, mimetype='application/json')

@app.route('/purchase', methods=['POST'])
def make_purchase():
    purchase_details = request.json
    return process_purchase(purchase_details)

if __name__ == '__main__':
    app.run(debug=True)
