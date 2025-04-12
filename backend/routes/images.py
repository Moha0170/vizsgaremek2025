from flask import Blueprint, request, jsonify, send_from_directory
from backend import db, app
from ..dec import token_required
from sqlalchemy import text
from werkzeug.utils import secure_filename
import os
from flasgger import swag_from

images_bp = Blueprint("images_bp", __name__, url_prefix="/images")

@images_bp.route("/upload", methods=["POST"])
@swag_from("../docs/images_upload.yaml")
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

@images_bp.route("/getImg/<filename>", methods=["GET"])
@swag_from("../docs/image_getImg.yaml")
def uploaded_file(filename):
    try:
        return send_from_directory(os.path.join(app.root_path, "uploads"), filename)
    except (Exception) as e:
        print(e)
        return jsonify({"error": "File not found"}), 404