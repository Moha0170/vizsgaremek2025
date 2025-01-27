from flask import Flask, Blueprint

admin_bp = Blueprint("admin_bp", __name__, url_prefix="/admin")

@admin_bp.route("/")
def asd():
    return "<h1>admin</h1>"