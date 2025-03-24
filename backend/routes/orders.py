from flask import Blueprint, request, jsonify
from backend import db, argon2, app
from sqlalchemy import text
from datetime import datetime

order_bp = Blueprint("order_bp", __name__, url_prefix="/orders")

@order_bp.route("/getOrders/<felhasznalo_id>", methods=['GET'])
def getOrder(felhasznalo_id):
    try:
        results = db.session.execute(
            text("""
                SELECT * FROM rendelesek WHERE felhasznalo_id = :felhasznalo_id
            """),
            {"felhasznalo_id": felhasznalo_id}
        ).fetchall()
        return jsonify([row._asdict() for row in results]), 200
    except Exception as e:
        return str(e), 500

@order_bp.route("/getProductsFromOrder/<id>", methods=['GET'])
def getProductsFromOrder(id):
    try:
        results = db.session.execute(
            text("""
                SELECT * FROM rendeles_termekek WHERE rendeles_id = :id
            """),
            {"id": id}
        ).fetchall()
        return jsonify([row._asdict() for row in results]), 200
    except Exception as e:
        return str(e), 500

@order_bp.route("/createOrderFromCart/<felhasznalo_id>", methods=['POST'])
def createOrderFromCart(felhasznalo_id):
    try:
        kosar = db.session.execute(text("SELECT termek_id, mennyiseg FROM kosar_termekek WHERE felhasznalo_id = :felhasznalo_id"), {"felhasznalo_id": felhasznalo_id}).fetchall()
        if not kosar:
            return "A kosár üres!", 404
        kosar = [row._asdict() for row in kosar]

        cim = request.json['cim']
        """ kupon = request.json['kupon']
        if kupon != "":
            kupon_ertek = db.session.execute(text("SELECT ertek FROM kuponkodok WHERE kod = :kod"), {"kod": kupon}).fetchone()
            if kupon_ertek:
                kupon_ertek = kupon_ertek[0]
            else:
                kupon_ertek = 0
        else:
            kupon_ertek = 0 """
        vasarlas_osszeg = 0
        
        for termek in kosar:
            termek_osszeg = db.session.execute(text("SELECT ara FROM termekek WHERE id = :id"), {"id": termek['termek_id']}).fetchone()[0] * termek['mennyiseg']
            vasarlas_osszeg += termek_osszeg
        rendeles_datum = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        db.session.execute(
            text("""INSERT INTO rendelesek (felhasznalo_id, cim, vasarlas_osszeg, rendeles_datum, kezbesitett) VALUES(:felhasznalo_id, :cim, :vasarlas_osszeg, :rendeles_datum, 0)"""),
            {"felhasznalo_id": felhasznalo_id, "cim": cim, "vasarlas_osszeg": vasarlas_osszeg, "rendeles_datum": rendeles_datum}
        )
        db.session.commit()

        rendeles_id = db.session.execute(text("SELECT id FROM rendelesek WHERE felhasznalo_id = :felhasznalo_id AND rendeles_datum = :rendeles_datum"), {"felhasznalo_id": felhasznalo_id, "rendeles_datum": rendeles_datum}).fetchone()[0]
        db.session.commit()
        for termek in kosar:
            db.session.execute(
                text("""INSERT INTO rendeles_termekek (rendeles_id, termek_id, mennyiseg) VALUES(:rendeles_id, :termek_id, :mennyiseg)"""),
                {"rendeles_id": rendeles_id, "termek_id": termek['termek_id'], "mennyiseg": termek['mennyiseg']}
            )
            db.session.commit()
        
        return "Rendelés sikeresen létrehozva!", 200
    except Exception as e:
        return str(e), 500