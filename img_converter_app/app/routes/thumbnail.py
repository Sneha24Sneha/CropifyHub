from flask import request, jsonify
from app.utils import save_image, image_to_base64, InvalidImageException

def init_app(app):
    @app.route('/api/thumbnail', methods=['POST'])
    def thumbnail_image():
        try:
            if 'image' not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files['image']
            img, _ = save_image(file, file.filename)
            
            # Create thumbnail
            size = (128, 128)
            img.thumbnail(size)

            base64_img = image_to_base64(img)

            return jsonify({
                "filename": f"thumb_{file.filename}",
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            app.logger.exception("Thumbnail creation failed")
            return jsonify({"error": "Thumbnail creation failed"}), 500
