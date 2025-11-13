from flask import request, jsonify
from app.utils import load_image, image_to_base64, InvalidImageException, setup_logger

logger = setup_logger()

def init_app(app):
    @app.route("/api/grayscale", methods=["POST"])
    def grayscale_image():
        try:
            if "image" not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files["image"]

            try:
                img = load_image(file)
            except Exception:
                raise InvalidImageException("Unsupported or corrupt image format")

            gray = img.convert("L")
            img_base64 = image_to_base64(gray)

            return jsonify({
                "status": True,
                "message": "Image converted to grayscale successfully",
                "filename": f"grayscale_{file.filename}",
                "image_base64": img_base64
            })

        except InvalidImageException as e:
            raise e  # Handled globally
        except Exception as e:
            logger.exception("Unhandled exception in grayscale_image")
            return jsonify({"status":False,"message": "Internal Server Error"}), 500
