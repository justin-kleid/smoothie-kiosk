from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os
import configparser
from db import add_product, get_all_products, update_product, delete_product, get_inventory, get_sales, process_purchase



config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))
 
app = Flask(__name__)

app.config["MONGO_URI"] = config['PROD']['DB_URI']

# Admin Routes
@app.route('/admin/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_products():
    if request.method == 'POST':
        product = request.json
        return add_product(product)
    elif request.method == 'GET':
        return jsonify(get_all_products())
    elif request.method == 'PUT':
        product = request.json
        return update_product(product)
    elif request.method == 'DELETE':
        product_id = request.args.get('id')
        return delete_product(product_id)

@app.route('/admin/inventory', methods=['GET'])
def view_inventory():
    return jsonify(get_inventory())

@app.route('/admin/sales', methods=['GET'])
def view_sales():
    return jsonify(get_sales())


# Customer Routes
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(get_all_products())

@app.route('/purchase', methods=['POST'])
def make_purchase():
    purchase_details = request.json
    return process_purchase(purchase_details)


if __name__ == '__main__':
    app.run(debug=True)
