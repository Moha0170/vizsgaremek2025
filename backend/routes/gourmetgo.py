from flask import Flask, Blueprint

gourmetgo_bp = Blueprint("gourmetgo_bp", __name__, url_prefix="/gourmetgo")

@gourmetgo_bp.route("/")
def asd():
    return "<h1>gourmetgo</h1>"