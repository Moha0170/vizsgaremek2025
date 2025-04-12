from flask import Blueprint, request, jsonify
from backend import db, argon2, app
from sqlalchemy import text
from jwt import encode
from flasgger import swag_from

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/login/", methods=['POST'])
@swag_from("../docs/profile_login.yaml")
def login():
    results = db.session.execute(
        text("""
            SELECT l.password, f.id, f.neve, f.email, f.telefonszam, f.szuldatum, f.admin
            FROM login l 
            JOIN felhasznalok f ON l.felhasznalo_id = f.id 
            WHERE l.user = :user
        """), 
        {"user": request.json['user']}
    )
    results = results.fetchone()

    if results is None:
        return {"message": "Nincs ilyen felhasználó!"}, 404

    stored_password, user_id, neve, email, telefonszam, szuldatum, is_admin = results

    if argon2.check_password_hash(stored_password, request.json['password']):
        token = encode({
            "message": "Sikeres bejelentkezés",
            "userId": user_id,
            "username": neve,
            "email": email,
            "telefonszam": telefonszam,
            "szuldatum": str(szuldatum),
            "isAdmin": bool(is_admin)
        }, app.config["SECRET_KEY"], algorithm="HS256")
        return jsonify({"token": token}), 200
    else:
        return {"message": "Sikertelen bejelentkezés"}, 401


@profile_bp.route("/register/", methods=['POST'])
@swag_from("../docs/profile_register.yaml")
def register():
    try:
        existing_user = db.session.execute(
            text("SELECT user FROM login WHERE user = :user"), 
            {"user": request.json['user']}
        ).fetchone()
        
        if existing_user is not None:
            return {"message": "Már létezik ilyen felhasználó!"}, 409

        user = request.json['user']
        password = argon2.generate_password_hash(request.json['password'])
        email = request.json['email']
        telefonszam = request.json['telefonszam']
        szuldatum = request.json['szuldatum']
        nev = request.json['neve']

        db.session.execute(
            text("""
                INSERT INTO felhasznalok (neve, email, telefonszam, szuldatum) 
                VALUES (:nev, :email, :telefonszam, :szuldatum)
            """), 
            {"nev": nev, "email": email, "telefonszam": telefonszam, "szuldatum": szuldatum}
        )
        db.session.commit()

        user_id = db.session.execute(text("SELECT LAST_INSERT_ID()")).scalar()

        db.session.execute(
            text("INSERT INTO login (user, password, felhasznalo_id) VALUES (:user, :password, :felhasznalo_id)"), 
            {"user": user, "password": password, "felhasznalo_id": user_id}
        )
        db.session.commit()

        return {
            "message": "Sikeres regisztráció",
            "userId": user_id,
            "username": nev,
            "email": email,
            "telefonszam": telefonszam,
            "szuldatum": szuldatum,
            "isAdmin": False
        }, 200

    except Exception as e:
        db.session.rollback()
        return {"message": "Hiba történt: " + str(e)}, 400
