from flask import Flask, Blueprint
from backend import db
from sqlalchemy import text

cart_bp = Blueprint("cart_bp", __name__, url_prefix="/cart")

@cart_bp.route("/<id>", methods=["GET"])
def cartById(id):
    a = db.session.execute(text("SELECT termekek.ara, termekek.neve, kosar_termekek.mennyiseg, kosar_termekek.termek_id FROM kosar_termekek INNER JOIN termekek ON kosar_termekek.termek_id = termekek.id WHERE kosar_termekek.felhasznalo_id = :id"), {"id": id})
    result = [row._asdict() for row in a]
    if result == []:
        print(result)
        return "Nincs ilyen kosar", 404
    else:
        print(result)
        return result, 200

@cart_bp.route("/<cartID>/<itemID>/<ammount>", methods=["POST"])
def addToCart(cartID, itemID, ammount):
    try:
        a = db.session.execute(text("SELECT * FROM kosar_termekek WHERE felhasznalo_id = :id AND termek_id = :itemID"), {"id": cartID, "itemID": itemID})
        result = [row._asdict() for row in a]
        if result != []:
            a = db.session.execute(text("UPDATE kosar_termekek SET mennyiseg = mennyiseg + :ammount WHERE felhasznalo_id = :id AND termek_id = :itemID"), {"id": cartID, "itemID": itemID, "ammount": ammount})
            db.session.commit()
        else:
            db.session.execute(text("INSERT INTO kosar_termekek (felhasznalo_id, termek_id, mennyiseg) VALUES (:kosar_id, :termek_id, :mennyiseg)") , {"kosar_id": cartID, "termek_id": itemID, "mennyiseg": ammount})
            db.session.commit()    
        return "Sikeresen kosarhoz adva", 200
    except (Exception) as error:
        return str(error), 400

@cart_bp.route("/<cartID>/<itemID>", methods=["DELETE"])
def deleteFromCart(cartID, itemID):
    try:
        a = db.session.execute(text("DELETE FROM kosar_termekek WHERE felhasznalo_id = :id AND termek_id = :itemID"), {"id": cartID, "itemID": itemID})
        db.session.commit()
        return "Sikeresen törölve", 200
    except (Exception) as error:
        return str(error), 400

@cart_bp.route("/<cartID>", methods=["DELETE"])
def deleteCart(cartID):
    try:
        a = db.session.execute(text("DELETE FROM kosar_termekek WHERE felhasznalo_id = :id"), {"id": cartID})
        db.session.commit()
        return "Sikeresen törölve", 200
    except (Exception) as error:
        return str(error), 400