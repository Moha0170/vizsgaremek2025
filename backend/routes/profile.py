from flask import Flask, Blueprint, request
from backend import db, argon2
from sqlalchemy import text

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/login/", methods=['GET'])
def login():
    results = db.session.execute(text("SELECT * FROM `login` WHERE `user` = :user AND `password` = :password"), {'user': request.json['user'], 'password': request.json['password']})