from flask import Blueprint, jsonify, request
from sqlalchemy import text
from flasgger import swag_from
from backend import db

market_bp = Blueprint("market_bp", __name__, url_prefix="/market")

@market_bp.route("/allProducts", methods=['GET'])
@swag_from("../docs/market_allProducts.yaml")
def allProducts():
    results = db.session.execute(text("SELECT * FROM `termekek`")).fetchall()
    return jsonify([row._asdict() for row in results])

@market_bp.route("/getProductByKat/<kat>", methods=['GET'])
@swag_from("../docs/market_getProductById.yaml")
def getProducts(kat):
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `kat` = :kat"), {'kat': kat})
    return jsonify([row._asdict() for row in results])

@market_bp.route("/getProduct/<id>", methods=['GET'])
@swag_from("../docs/market_getProduct.yaml")
def getProductById(id):
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `id` = :id"), {'id': id}).fetchone()
    results = jsonify(results._asdict())
    if not results:
        return jsonify({"error": "Termék nem található"}), 404
    else:
        return results, 200
