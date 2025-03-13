from flask import Blueprint, request, jsonify
from backend import db, argon2, app
from sqlalchemy import text

order_bp = Blueprint("order_bp", __name__, url_prefix="/orders")

@order_bp.route("/getOrders/<felhasznalo_id>", methods=['GET'])
def getOrder(felhasznalo_id):
    results = db.session.execute(
        text("""
            SELECT * FROM rendelesek WHERE felhasznalo_id = :felhasznalo_id
        """),
        {"felhasznalo_id": felhasznalo_id}
    ).fetchall()
    return jsonify([row._asdict() for row in results]), 200