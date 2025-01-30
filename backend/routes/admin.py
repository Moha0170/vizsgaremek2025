from flask import Flask, Blueprint, request
from sqlalchemy import text
from backend import db

admin_bp = Blueprint("admin_bp", __name__, url_prefix="/admin")

@admin_bp.route("/product/delete/<id>", methods=['DELETE'])
def delete(id):
    db.session.execute(text("DELETE FROM termekek WHERE id = :id"), {"id": id})
    db.session.commit()
    return {"message": "Product deleted!"}

@admin_bp.route("/product/create/", methods=['POST'])
def create():
    neve = request.json['neve']
    ara = request.json['ara']
    kat = request.json['kat']
    gyarto_beszallito = request.json['gyarto_beszallito']
    db.session.execute(text("INSERT INTO termekek (neve, ara, kat, gyarto_beszallito) VALUES (:nev, :ar, :kat, :gyarto)"), {"nev": neve, "ar": int(ara), "kat": kat, "gyarto": gyarto_beszallito})
    db.session.commit()
    return {"message": "Product created!"}

@admin_bp.route("/product/update/<id>", methods=['PATCH'])
def update(id):
    neve = request.json['neve']
    ara = request.json['ara']
    kat = request.json['kat']
    gyarto_beszallito = request.json['gyarto_beszallito']
    db.session.execute(text("UPDATE termekek SET neve = :nev, ara = :ar, kat = :kat, gyarto_beszallito = :gyarto WHERE id = :id"), {"nev": neve, "ar": int(ara), "kat": kat, "gyarto": gyarto_beszallito, "id": id})
    db.session.commit()
    return {"message": "Product updated!"}