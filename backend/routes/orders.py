from flask import Blueprint, request, jsonify
from backend import db
from sqlalchemy import text
from datetime import datetime
from backend.dec import token_required
 
order_bp = Blueprint("order_bp", __name__, url_prefix="/orders")
 
@order_bp.route("/getOrders/<felhasznalo_id>", methods=['GET'])
def getOrder(felhasznalo_id):
    try:
        results = db.session.execute(
            text("SELECT * FROM rendelesek WHERE felhasznalo_id = :felhasznalo_id"),
            {"felhasznalo_id": felhasznalo_id}
        ).fetchall()
        return jsonify([row._asdict() for row in results]), 200
    except Exception as e:
        return str(e), 500
 
@order_bp.route("/getProductsFromOrder/<id>", methods=['GET'])
def getProductsFromOrder(id):
    try:
        results = db.session.execute(
            text("SELECT mennyiseg, termek_id FROM rendeles_termekek WHERE rendeles_id = :id"),
            {"id": id}
        ).fetchall()
        resultsDict = [row._asdict() for row in results]
        for i in range(len(resultsDict)):
            resultsDict[i]['neve'] = db.session.execute(
                text("SELECT neve FROM termekek WHERE id = :id"),
                {"id": resultsDict[i]['termek_id']}
            ).fetchone()
            resultsDict[i]['neve'] = resultsDict[i]['neve'][0]
        return jsonify(resultsDict), 200
    except Exception as e:
        return str(e), 500
    
@order_bp.route("/getAllOrder/", methods=['GET'])
@token_required
def getAllOrder():
    try:
        results = db.session.execute(
            text("SELECT * FROM rendelesek")
        ).fetchall()
        return jsonify([row._asdict() for row in results]), 200
    except Exception as e:
        return str(e), 500
 
@order_bp.route("/createOrderFromCart/<felhasznalo_id>", methods=['POST'])
def createOrderFromCart(felhasznalo_id):
    try:
        orszag = request.json["orszag"]
        iranyitoszam = request.json["iranyitoszam"]
        varos = request.json["varos"]
        kozterulet = request.json["kozterulet"]
        kozterulet_jellege = request.json["kozterulet_jellege"]
        hazszam = request.json["hazszam"]
        kupon = request.json["kupon"]
        if not all([orszag, iranyitoszam, varos, kozterulet, kozterulet_jellege, hazszam]):
            return "Hiányzó címadatok!", 400

        kosar = db.session.execute(
            text("SELECT termek_id, mennyiseg FROM kosar_termekek WHERE felhasznalo_id = :felhasznalo_id"),
            {"felhasznalo_id": felhasznalo_id}).fetchall()
        if not kosar:
            return "A kosár üres!", 404
        kosar = [row._asdict() for row in kosar]

        vasarlas_osszeg = 1999
        for termek in kosar:
            vasarlas_osszeg += db.session.execute(text("SELECT ara FROM termekek WHERE id = :id"), {"id": termek['termek_id']}).fetchone()[0] * termek['mennyiseg']
        rendeles_datum = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if kupon:
            kupon_adat = db.session.execute(text("SELECT ertek FROM kuponkodok WHERE kod = :kod"), {"kod": kupon}).fetchone()
            if kupon_adat:
                kupon_ertek = kupon_adat[0]
                match kupon_ertek:
                    case "10":
                        vasarlas_osszeg = ((vasarlas_osszeg-1999) * 0.9) + 1999
                        db.session.execute(text("DELETE FROM kuponkodok WHERE kod = :kod"), {"kod": kupon})
                        db.session.commit()
                    case "20":
                        vasarlas_osszeg = ((vasarlas_osszeg-1999) * 0.8) + 1999
                        db.session.execute(text("DELETE FROM kuponkodok WHERE kod = :kod"), {"kod": kupon})
                        db.session.commit()
                    case "50":
                        vasarlas_osszeg = ((vasarlas_osszeg-1999) * 0.5) + 1999
                        db.session.execute(text("DELETE FROM kuponkodok WHERE kod = :kod"), {"kod": kupon})
                        db.session.commit()
                    case "1000":
                        if vasarlas_osszeg-1999 > 5000:
                            vasarlas_osszeg -= 1000
                            db.session.execute(text("DELETE FROM kuponkodok WHERE kod = :kod"), {"kod": kupon})
                            db.session.commit()
                        else:
                            return "A kuponkód használatához el kell érni legalább 5000 forintos kosárértéket!", 401
                    case "ingyen":
                        vasarlas_osszeg -= 1999
                    case _:
                        return "Nem létező kuponkedvezmény", 500
            else:
                return "Érvénytelen kupon!", 400
 
        rendeles_datum = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
 
        cim = orszag + "" + iranyitoszam + "" + varos + "" + kozterulet + "" + kozterulet_jellege + "" + hazszam
        db.session.execute(
            text("""INSERT INTO rendelesek (felhasznalo_id, cim, vasarlas_osszeg, rendeles_datum, kezbesitett) VALUES(:felhasznalo_id, :cim, :vasarlas_osszeg, :rendeles_datum, 0)"""),
            {"felhasznalo_id": felhasznalo_id, "cim": cim, "vasarlas_osszeg": vasarlas_osszeg, "rendeles_datum": rendeles_datum}
        )
        db.session.commit()
 
        rendeles_id = db.session.execute(
            text("SELECT id FROM rendelesek WHERE felhasznalo_id = :felhasznalo_id AND rendeles_datum = :rendeles_datum"),
            {"felhasznalo_id": felhasznalo_id, "rendeles_datum": rendeles_datum}).fetchone()[0]
        for termek in kosar:
            db.session.execute(
                text("INSERT INTO rendeles_termekek (rendeles_id, termek_id, mennyiseg) VALUES(:rendeles_id, :termek_id, :mennyiseg)"),
                {"rendeles_id": rendeles_id, "termek_id": termek['termek_id'], "mennyiseg": termek['mennyiseg']}
            )
        db.session.commit()
 
        return "Rendelés sikeresen létrehozva!", 200
    except Exception as e:
        db.session.rollback()
        print(str(e))
        return str(e), 500