from flask import Flask, Blueprint
from backend import db
from sqlalchemy import text
from flasgger import swag_from

cart_bp = Blueprint("cart_bp", __name__, url_prefix="/cart")

@cart_bp.route("/<id>", methods=["GET"])
@swag_from("../docs/cart_get.yaml")
def cartById(id):
    a = db.session.execute(text("SELECT termekek.ara, termekek.neve, kosar_termekek.mennyiseg, kosar_termekek.termek_id FROM kosar_termekek INNER JOIN termekek ON kosar_termekek.termek_id = termekek.id WHERE kosar_termekek.felhasznalo_id = :id"), {"id": id})
    ossz = 0
    result = [row._asdict() for row in a]
    for row in result:
        row["ara"] = int(row["ara"]) * int(row["mennyiseg"])
    for row in result:
        ossz += row["ara"]
    if result == []:
        return "Nincs ilyen kosar", 404
    else:
        result.append({"osszeg": ossz + 1999})
        return result, 200

@cart_bp.route("/<cartID>/<itemID>/<ammount>", methods=["POST"])
@swag_from("../docs/cart_addItem.yaml")
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
@swag_from("../docs/cart_deleteItem.yaml")
def deleteFromCart(cartID, itemID):
    try:
        a = db.session.execute(text("DELETE FROM kosar_termekek WHERE felhasznalo_id = :id AND termek_id = :itemID"), {"id": cartID, "itemID": itemID})
        db.session.commit()
        return "Sikeresen törölve", 200
    except (Exception) as error:
        return str(error), 400

@cart_bp.route("/<cartID>", methods=["DELETE"])
@swag_from("../docs/cart_deleteCart.yaml")
def deleteCart(cartID):
    try:
        a = db.session.execute(text("DELETE FROM kosar_termekek WHERE felhasznalo_id = :id"), {"id": cartID})
        db.session.commit()
        return "Sikeresen törölve", 200
    except (Exception) as error:
        return str(error), 400