from flask import Flask, Blueprint
from backend import db
from sqlalchemy import text
import random
import string

coupon_bp = Blueprint("coupon_bp", __name__, url_prefix="/coupon")

@coupon_bp.route("/<kod>", methods=["GET"])
def couponById(id):
    a = db.session.execute(text("SELECT * FROM kuponok WHERE id = :id"), {"id": id})
    result = [row._asdict() for row in a]
    if not result:
        return "Nincs ilyen kupon", 404
    else:
        return result, 200

@coupon_bp.route("/addCoupon/<type>", methods=["POST"])
def addCoupon(type):
    couponList = ["10", "20", "0", "50", "1000", "ingyen"]
    selectedCoupon = couponList[int(type)]
    if selectedCoupon == "0":
            return "Most nem nyertél, de holnap újra megpróbálhatod!", 200
    else:
        kod = ""
        for a in range(3):
            kod += ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
            if a < 2:
                kod += "-"
        a = db.session.execute(text("SELECT * FROM kuponkodok WHERE kod = :kod"), {"kod": kod})
        result = [row._asdict() for row in a]
        if result == []:
            db.session.execute(text("INSERT INTO kuponkodok (kod, ertek) VALUES (:kod, :ertek)"), {"kod": kod, "ertek": selectedCoupon})
            db.session.commit()
            return kod, 200
        else:
            return "Hiba történt, kérlek próbáld újra!", 500

        