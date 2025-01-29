from flask_sqlalchemy import SQLAlchemy

from backend import db

class Felhasznalo(db.Model):
    __tablename__ = 'felhasznalok'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    id = db.Column(db.Integer, primary_key=True)
    neve = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    telefonszam = db.Column(db.String(20))
    szuldatum = db.Column(db.Date)
    husegpont = db.Column(db.Integer, default=0)

    # relációk
    kosarak = db.relationship('Kosar', backref='felhasznalo', lazy=True)
    login = db.relationship('Login', uselist=False, backref='felhasznalo')


class Kosar(db.Model):
    __tablename__ = 'kosar'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    id = db.Column(db.Integer, primary_key=True)
    felhasznalo_id = db.Column(db.Integer, db.ForeignKey('felhasznalok.id'), nullable=False)

    # relációk
    termekek = db.relationship('KosarTermek', backref='kosar', lazy=True)


class KosarTermek(db.Model):
    __tablename__ = 'kosar_termekek'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    kosar_id = db.Column(db.Integer, db.ForeignKey('kosar.id'), primary_key=True)
    termek_id = db.Column(db.Integer, db.ForeignKey('termekek.id'), primary_key=True)
    mennyiseg = db.Column(db.Integer, nullable=False)


class Kuponkod(db.Model):
    __tablename__ = 'kuponkodok'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    id = db.Column(db.Integer, primary_key=True)
    neve = db.Column(db.String(255), nullable=False)
    kedvezmeny_szazalek = db.Column(db.Integer, nullable=False)
    minimum_vasarlas = db.Column(db.Numeric(10, 2), nullable=False)


class Login(db.Model):
    __tablename__ = 'login'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    felhasznalo_id = db.Column(db.Integer, db.ForeignKey('felhasznalok.id'), primary_key=True)
    user = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)


class Termek(db.Model):
    __tablename__ = 'termekek'
    __table_args__ = {'mysql_charset': 'utf8mb4'}

    id = db.Column(db.Integer, primary_key=True)
    neve = db.Column(db.String(255), nullable=False)
    ara = db.Column(db.Numeric(10, 2), nullable=False)
    kat = db.Column(db.String(255), nullable=False)
    gyarto_beszallito = db.Column(db.String(255), nullable=False)

    # relációk
    kosarak = db.relationship('KosarTermek', backref='termek', lazy=True)
