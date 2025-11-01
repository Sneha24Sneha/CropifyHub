import io
from flask import request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
from app.utils import save_image, image_to_base64, InvalidImageException

def init_app(app):
    @app.route('/api/compress', methods=['POST'])
    def compress_image():
        try:
            if 'image' not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files['image']
            filename = secure_filename(file.filename)
            quality = int(request.form.get('quality', 85))  # Default quality

            if not (1 <= quality <= 100):
                raise InvalidImageException("Quality must be between 1 and 100")

            img = Image.open(file)
            fmt = img.format.upper()

            if fmt not in {'JPEG', 'PNG'}:
                raise InvalidImageException(f"Unsupported format: {fmt}")

            # Prepare in-memory buffer
            img_io = io.BytesIO()
            if fmt == 'JPEG':
                img = img.convert('RGB')  # Ensure compatibility
                img.save(img_io, format='JPEG', quality=quality, optimize=True)
            elif fmt == 'PNG':
                img.save(img_io, format='PNG', optimize=True)

            img_io.seek(0)

            # Convert to base64 string
            base, _ = filename.rsplit('.', 1)
            ext = 'jpg' if fmt == 'JPEG' else 'png'
            out_name = f"{base}_compressed.{ext}"

            base64_img = image_to_base64(Image.open(img_io), format=fmt)

            return jsonify({
                "filename": out_name,
                "image_base64": base64_img
            })

        except InvalidImageException as e:
            return jsonify({"error": str(e)}), 400
        except Exception:
            app.logger.exception("Image compression failed")
            return jsonify({"error": "Image compression failed"}), 500
