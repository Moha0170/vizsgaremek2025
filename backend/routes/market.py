from flask import Blueprint, jsonify, request
from sqlalchemy import text
from backend import db
from backend.models.model import Termek

market_bp = Blueprint("market_bp", __name__, url_prefix="/market")

@market_bp.route("/allProducts", methods=['GET'])
def allProducts():
    results = Termek.query.all()
    data = [{column.name: getattr(row, column.name) for column in Termek.__table__.columns} for row in results]
    return jsonify(data)

@market_bp.route("/getProductByKat/<kat>", methods=['GET'])
def getProducts(kat):
    a = []
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `kat` = :kat"), {'kat': kat})
    for row in results.mappings():
        a.append(dict(row))
    return jsonify(a)

@market_bp.route("/getProduct/<id>", methods=['GET'])
def getProductById(id):
    results = db.session.execute(text("SELECT * FROM `termekek` WHERE `id` = :id"), {'id': id}).mappings().fetchone()
    return {"nev": results['neve'], "ar": results['ara']}