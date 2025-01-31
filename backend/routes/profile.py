from flask import Flask, Blueprint

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/register/")
def register():
    return ""