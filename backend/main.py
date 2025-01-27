from flask import Flask, Blueprint
from .routes.admin import admin_bp
from .routes.cart import cart_bp
from .routes.market import market_bp
from .routes.gourmetgo import gourmetgo_bp
from .routes.profile import profile_bp

app = Flask(__name__)
app.register_blueprint(admin_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(gourmetgo_bp)
app.register_blueprint(market_bp)
app.register_blueprint(profile_bp)

if __name__ == '__main__':
    app.run(debug=True) 