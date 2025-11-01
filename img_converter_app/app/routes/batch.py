from flask import request, jsonify
from app.utils import save_image, image_to_base64, InvalidImageException

def init_app(app):
    @app.route('/api/batch', methods=['POST'])
    def batch_process():
        try:
            if 'images' not in request.files:
                return jsonify({"error": "No images uploaded"}), 400
            
            files = request.files.getlist('images')
            formats = request.form.getlist('formats')

            results = []
            for idx, file in enumerate(files):
                fmt = formats[idx] if idx < len(formats) else None
                img, _ = save_image(file, file.filename)
                # Add batch processing logic, e.g., convert or resize
                
                base64_img = image_to_base64(img)
                results.append({
                    "filename": file.filename,
                    "image_base64": base64_img,
                    "format": fmt
                })

            return jsonify({"results": results})

        except InvalidImageException as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            app.logger.exception("Batch processing failed")
            return jsonify({"error": "Batch processing failed"}), 500
