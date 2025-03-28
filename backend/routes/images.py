from flask import Blueprint, request, jsonify, send_from_directory
from backend import db, app
from ..dec import token_required
from sqlalchemy import text
from werkzeug.utils import secure_filename
import os

images_bp = Blueprint("images_bp", __name__, url_prefix="/images")

@images_bp.route("/upload", methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(file.filename)
    img_path = os.path.join(app.root_path, 'uploads')
    os.makedirs(img_path, exist_ok=True)
    file.save(os.path.join(img_path, filename))
    return jsonify({'message': 'File uploaded successfully', 'filename': filename})

@images_bp.route("/<filename>", methods=["GET"])
def uploaded_file(filename):
    return send_from_directory(app.config['IMG_PATH'], filename)