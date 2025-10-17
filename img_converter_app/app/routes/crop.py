# app/routes/crop.py

from flask import request, jsonify
from app.utils import save_image, image_to_base64, InvalidImageException

def init_app(app):
    @app.route('/api/crop', methods=['POST'])
    def crop_image():
        try:
            if 'image' not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files['image']
            x = int(float(request.form['x']))
            y = int(float(request.form['y']))
            width = int(float(request.form['width']))
            height = int(float(request.form['height']))

            img, _ = save_image(file, file.filename)
            cropped = img.crop((x, y, x + width, y + height))
            base64_img = image_to_base64(cropped)

            return jsonify({
                "filename": f"cropped_{file.filename}",
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            app.logger.exception("Crop failed")
            return jsonify({"error": "Image crop failed"}), 500
