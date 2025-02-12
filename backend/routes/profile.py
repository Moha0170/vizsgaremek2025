from flask import Flask, Blueprint, request
from backend import db, argon2
from sqlalchemy import text

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/login/", methods=['POST'])
def login():
    results = db.session.execute(
        text("SELECT `password` FROM `login` WHERE `user` = :user"), 
        {"user": request.json['user']}
    )
    results = results.fetchone()

    if results is None:
        return "Nincs ilyen felhasználó!", 404

    stored_password = results[0]

    if argon2.check_password_hash(stored_password, request.json['password']):
        return "Sikeres bejelentkezés", 200
    else:
        return "Sikertelen bejelentkezés", 401
