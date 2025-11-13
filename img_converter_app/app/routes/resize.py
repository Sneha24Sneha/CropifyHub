from flask import request, jsonify
from app.utils import load_image, image_to_base64, InvalidImageException

def init_app(app):
    @app.route("/api/resize", methods=["POST"])
    def resize_image():
        try:
            if "image" not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files["image"]
            width = int(request.form["width"])
            height = int(request.form["height"])

            img = load_image(file)
            resized = img.resize((width, height))
            base64_img = image_to_base64(resized)

            return jsonify({
                "status":True, 
                "message": "Image resized successfully",
                "filename": f"resized_{file.filename}",
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            raise e
        except Exception as e:
            app.logger.exception("Resize failed")
            return jsonify({"status":False, "message": "Image resize failed"}), 500
