from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.utils import save_image, image_to_base64, InvalidImageException

SUPPORTED_FORMATS = {'PNG', 'JPEG', 'JPG', 'WEBP'}

def init_app(app):
    @app.route('/api/convert', methods=['POST'])
    def convert_image():
        try:
            if 'image' not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files['image']
            fmt = request.form.get('format', '').upper()
            if fmt == 'JPG':
                fmt = 'JPEG'

            if fmt not in SUPPORTED_FORMATS:
                raise InvalidImageException(f"Unsupported format: {fmt}")

            filename = secure_filename(file.filename)
            img = save_image(file, filename, convert_mode='RGB')

            base = filename.rsplit('.', 1)
            ext = 'jpg' if fmt == 'JPEG' else fmt.lower()
            out_name = f"{base}.{ext}"

            base64_img = image_to_base64(img, format=fmt)

            return jsonify({
                "filename": out_name,
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            app.logger.exception("Image conversion failed")
            return jsonify({"error": "Image conversion failed"}), 500
