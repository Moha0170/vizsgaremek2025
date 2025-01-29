from flask import Blueprint, jsonify, request
from backend import db
from backend.models.model import Termek

market_bp = Blueprint("market_bp", __name__, url_prefix="/market")

@market_bp.route("/allProducts", methods=['GET'])
def allProducts():
    results = Termek.query.all()
    data = [{column.name: getattr(row, column.name) for column in Termek.__table__.columns} for row in results]
    return jsonify(data)

@market_bp.route("/getProduct/<type>", methods=['GET'])
def getProducts(type):
    return jsonify({"type": type})
