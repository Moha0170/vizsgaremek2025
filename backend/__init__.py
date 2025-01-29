from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/hypercharge?charset=utf8mb4'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .routes.admin import admin_bp
    from .routes.cart import cart_bp
    from .routes.market import market_bp
    from .routes.gourmetgo import gourmetgo_bp
    from .routes.profile import profile_bp

    app.register_blueprint(admin_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(gourmetgo_bp)
    app.register_blueprint(market_bp)
    app.register_blueprint(profile_bp)

    return app
