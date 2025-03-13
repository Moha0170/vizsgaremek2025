from flask import Blueprint, jsonify, request
from sqlalchemy import text
from backend import db
from backend.models.model import Termek

market_bp = Blueprint("market_bp", __name__, url_prefix="/market")

#ezt még fixálni kell
@market_bp.route("/allProducts", methods=['GET'])
def allProducts():
    results = Termek.query.all()
    data = [{column.name: getattr(row, column.name) for column in Termek.__table__.columns} for row in results]
    return jsonify(data)

@market_bp.route("/getProductByKat/<kat>", methods=['GET'])
def getProducts(kat):
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `kat` = :kat"), {'kat': kat})
    return jsonify([row._asdict() for row in results])

@market_bp.route("/getProduct/<id>", methods=['GET'])
def getProductById(id):
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `id` = :id"), {'id': id}).fetchone()
    results = jsonify([row._asdict() for row in results])
    if not results:
        return jsonify({"error": "Termék nem található"}), 404
    else:
        return results, 200
