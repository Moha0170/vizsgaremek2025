from flask import Flask, Blueprint, request
from sqlalchemy import text
from backend import db
from ..dec import token_required
from werkzeug.utils import secure_filename

admin_bp = Blueprint("admin_bp", __name__, url_prefix="/admin")

@admin_bp.route("/product/delete/<id>", methods=['DELETE'])
@token_required
def delete(id):
    db.session.execute(text("DELETE FROM termekek WHERE id = :id"), {"id": id})
    db.session.commit()
    return {"message": "Product deleted!"}

@admin_bp.route("/product/create/", methods=['POST'])
@token_required
def create():
    try:
        neve = request.form['neve']
        ara = request.form['ara']
        kat = request.form['kat']
        file = request.files['file']
        filename = secure_filename(file.filename)
        gyarto_beszallito = request.form['gyarto_beszallito']
        db.session.execute(text("INSERT INTO termekek (neve, ara, kat, gyarto_beszallito, kep) VALUES (:nev, :ar, :kat, :gyarto, :kep)"), {"nev": neve, "ar": int(ara), "kat": kat, "gyarto": gyarto_beszallito, "kep": filename})
        db.session.commit()
        return {"message": "Product created!"}
    except (Exception) as e:
        print(e)
        return str(e), 500

@admin_bp.route("/product/update/<id>", methods=['PATCH'])
@token_required
def update(id):
    try:
        neve = request.form['neve']
        ara = request.form['ara']
        kat = request.form['kat']
        file = request.files['file']
        filename = secure_filename(file.filename)
        gyarto_beszallito = request.form['gyarto_beszallito']
        db.session.execute(text("UPDATE termekek SET neve = :nev, ara = :ar, kat = :kat, gyarto_beszallito = :gyarto, kep = :kep WHERE id = :id"), {"nev": neve, "ar": int(ara), "kat": kat, "gyarto": gyarto_beszallito, "id": id, "kep": filename})
        db.session.commit()
        return {"message": "Product updated!"}
    except (Exception) as e:
        print(e)
        return str(e), 500

@admin_bp.route("/users/update/", methods=['PATCH'])
@token_required
def update_user():
    try:
        id = request.json['id']
        neve = request.json['neve']
        email = request.json['email']
        telefonszam = request.json['telefonszam']
        szuldatum = request.json['szuldatum']
        admin = request.json['admin']
        db.session.execute(text("UPDATE users SET neve = :nev, email = :email, telefonszam = :telefonszam, szuldatum = :szuldatum, admin = :admin WHERE id = :id"), {"nev": neve, "email": email, "telefonszam": telefonszam, "szuldatum": szuldatum, "id": id, "admin": admin})
        db.session.commit()
        return {"message": "User updated!"}
    except (Exception) as e:
        return str(e), 500