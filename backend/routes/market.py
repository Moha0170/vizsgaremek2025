from flask import Flask, Blueprint

market_bp = Blueprint("market_bp", __name__, url_prefix="/market")

@market_bp.route("/")
def asd():
    return "<h1>market</h1>"