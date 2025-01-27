from flask import Flask, Blueprint

profile_bp = Blueprint("profile_bp", __name__, url_prefix="/profile")

@profile_bp.route("/")
def asd():
    return "<h1>profile</h1>"