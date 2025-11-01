import os
from flask import Blueprint, request, jsonify, send_from_directory
from PIL import Image
from werkzeug.utils import secure_filename

# Blueprint for thumbnail feature
thumbnail = Blueprint("thumbnail", __name__)

UPLOAD_FOLDER = "static/uploads"
OUTPUT_FOLDER = "static/output"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@thumbnail.route("/api/thumbnail", methods=["POST"])
def create_thumbnail():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        width = int(request.form.get("width", 150))
        height = int(request.form.get("height", 150))

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            upload_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(upload_path)

            # 🧠 Create thumbnail
            img = Image.open(upload_path)
            img.thumbnail((width, height))

            base, ext = os.path.splitext(filename)
            thumb_filename = f"{base}_thumbnail{ext}"
            output_path = os.path.join(OUTPUT_FOLDER, thumb_filename)
            img.save(output_path)

            print(f"STEP ✅: Thumbnail created -> {output_path}")

            return jsonify({
                "message": "Thumbnail created successfully",
                "filename": thumb_filename,
                "download_url": f"/download-thumbnail/{thumb_filename}"  # ✅ added download link
            }), 200

        return jsonify({"error": "Invalid file type"}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Thumbnail creation failed"}), 500

# Change this
OUTPUT_FOLDER = os.path.join(os.getcwd(), "static", "output")

@thumbnail.route("/download-thumbnail/<path:filename>", methods=["GET"])
def download_thumbnail_file(filename):
    try:
        print(f"Downloading: {filename}")
        file_path = os.path.join(OUTPUT_FOLDER, filename)

        if not os.path.exists(file_path):
            print(f"⚠️ File not found: {file_path}")
            return jsonify({"error": "File not found"}), 404

        return send_from_directory(OUTPUT_FOLDER, filename, as_attachment=True)
    except Exception as e:
        print(f"Download error: {e}")
        return jsonify({"error": "Download failed"}), 500

# 🔗 Initialize in main app
def init_app(app):
    app.register_blueprint(thumbnail)
