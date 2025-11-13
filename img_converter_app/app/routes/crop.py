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

            MAX_SIZE = (4096, 4096)
            
            if width > MAX_SIZE[0] or height > MAX_SIZE[1]:
                return jsonify({"status":False, "message": "Crop dimensions exceed maximum allowed size"}), 400
            
            img, _ = save_image(file, file.filename)
            cropped = img.crop((x, y, x + width, y + height))
            base64_img = image_to_base64(cropped)

            return jsonify({
                "status": True,
                "filename": f"cropped_{file.filename}",
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            return jsonify({"status":False, "message": str(e)}), 400
        except Exception as e:
            app.logger.exception("Crop failed")
            return jsonify({"status":False, "message": "Image crop failed"}), 500
