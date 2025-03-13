from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_argon2 import Argon2
from flasgger import Swagger

db = SQLAlchemy()
app = Flask(__name__)
argon2 = Argon2(app)

def create_app():
    CORS(app)
    Swagger(app, template={
        "swagger": "2.0",
        "info": {
            "title": "Hypercharge API",
            "description": "API for Hypercharge",
            "version": "1.0.0"
        }
    })

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/hypercharge?charset=utf8mb4'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = "supersecretkey"
    app.config['SWAGGER'] = {
    'title': 'Hypercharge API',
    'uiversion': 2,
    'template': './resources/flasgger/swagger_ui.html'
    }

    db.init_app(app)

    from .routes.admin import admin_bp
    from .routes.cart import cart_bp
    from .routes.market import market_bp
    from .routes.profile import profile_bp
    from .routes.coupon import coupon_bp

    app.register_blueprint(admin_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(market_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(coupon_bp)

    return app
