from flask import Flask, Blueprint

cart_bp = Blueprint("cart_bp", __name__, url_prefix="/cart")

@cart_bp.route("/")
def asd():
    return "<h1>cart</h1>"