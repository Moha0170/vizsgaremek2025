from flask import Flask, Blueprint, request
from backend import db, argon2
from sqlalchemy import text

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/login/", methods=['POST'])
def login():
    results = db.session.execute(
        text("SELECT l.password, f.admin FROM login l JOIN felhasznalok f ON l.felhasznalo_id = f.id WHERE l.user = :user"), 
        {"user": request.json['user']}
    )
    results = results.fetchone()

    if results is None:
        return {"message": "Nincs ilyen felhasználó!"}, 404

    stored_password, is_admin = results

    if argon2.check_password_hash(stored_password, request.json['password']):
        return {"message": "Sikeres bejelentkezés", "isAdmin": bool(is_admin)}, 200
    else:
        return {"message": "Sikertelen bejelentkezés"}, 401



@profile_bp.route("/register/", methods=['POST'])
def register():
    try:
        a = db.session.execute(
            text("SELECT `user` FROM `login` WHERE `user` = :user"), 
            {"user": request.json['user']}
        )
        if a.fetchone() is not None:
            return "Már létezik ilyen felhasználó!", 409

        user = request.json['user']
        password = argon2.generate_password_hash(request.json['password'])
        email = request.json['email']
        telefonszam = request.json['telefonszam']
        szuldatum = request.json['szuldatum']
        husegpont = request.json['husegpont']
        nev = request.json['neve']

        result = db.session.execute(
            text("INSERT INTO felhasznalok (neve, email, telefonszam, szuldatum, husegpont) VALUES (:nev, :email, :telefonszam, :szuldatum, :husegpont)"), 
            {"nev": nev, "email": email, "telefonszam": telefonszam, "szuldatum": szuldatum, "husegpont": husegpont}
        )
        db.session.commit()

        user_id = db.session.execute(text("SELECT LAST_INSERT_ID()")).scalar()

        db.session.execute(
            text("INSERT INTO login (user, password, felhasznalo_id) VALUES (:user, :password, :felhasznalo_id)"), 
            {"user": user, "password": password, "felhasznalo_id": user_id}
        )

        db.session.commit()
        return "Sikeres regisztráció", 200

    except Exception as e:
        db.session.rollback()
        return "Hibás űrlap! " + str(e), 400
