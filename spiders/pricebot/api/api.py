import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import json_util

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'v3'
app.config['MONGO_URI'] = 'GET_FROM_ENV'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

mongo = PyMongo(app)


@app.route('/mcitems', methods=['GET'])
def get_all_mcitems():
    if request.method == 'GET':
        mcitems = mongo.db['items']
        output = []
        pipeline = [
    {"$project": { "_id": 1,
    "upc": 1,
    "retailer.microcenter.price": 1,
    "retailer.microcenter.sku": 1,
    "retailer.microcenter.url": 1,
    "retailer.microcenter.quantity": 1,
    "retailer.microcenter.instock": 1,
    "amzname": 1,
    "asin": 1,
    "amazonprice": 1,
    "canada": 1,
    "salesrank": 1,
    "fee": 1,
    "show": 1,
    "favorite": 1,
    "category": 1,
    "dateadded": 1,
    "categories.lvl1": 1,
    "amzlastupdated": 1,
    "roi": { "$let": {
        "vars": {
            "withtax": {"$multiply": ["$retailer.microcenter.price", 1.06]}
        },
        "in": {
            "$divide": [{"$subtract":  [{ "$subtract": ["$amazonprice", "$$withtax"]}, "$fee"]}, "$$withtax"]}
    }}
    }},


]
        for item in mcitems.aggregate(pipeline):
            output.append(json.loads(json_util.dumps(item)))
        return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0')
