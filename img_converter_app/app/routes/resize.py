from flask import request, jsonify, send_from_directory
from app.utils import load_image, image_to_base64, InvalidImageException
import os
import io
import base64

def init_app(app):
    @app.route("/api/resize", methods=["POST"])
    def resize_image():
        try:
            print("STEP 1 ✅: Request received")

            if "image" not in request.files:
                raise InvalidImageException("No image uploaded")

            file = request.files["image"]
            target_kb = float(request.form.get("target_kb", 200))  # default 200 KB
            print("STEP 2 ✅: Target size (KB) ->", target_kb)

            # Load image
            img = load_image(file)
            print("STEP 3 ✅: Image loaded successfully")

            # Convert RGBA → RGB if needed (JPEG doesn’t support RGBA)
            if img.mode == "RGBA":
                img = img.convert("RGB")

            buffer = io.BytesIO()
            quality = 95
            img.save(buffer, format="JPEG", quality=quality)
            print("STEP 4 ✅: Initial size ->", buffer.tell() / 1024, "KB")

            # Compress till desired KB
            while buffer.tell() / 1024 > target_kb and quality > 10:
                buffer = io.BytesIO()
                quality -= 5
                img.save(buffer, format="JPEG", quality=quality)
                print(f"🌀 Compressing... quality={quality}, current={buffer.tell() / 1024:.2f} KB")

            # Save final image
            output_dir = os.path.join(os.getcwd(), "static", "output")
            os.makedirs(output_dir, exist_ok=True)

            filename = os.path.splitext(file.filename)[0]
            new_filename = f"{filename}_resized.jpg"
            output_path = os.path.join(output_dir, new_filename)

            with open(output_path, "wb") as f:
                f.write(buffer.getvalue())

            print("STEP 6 ✅: Image saved ->", output_path)

            # Base64 for frontend preview
            base64_img = base64.b64encode(buffer.getvalue()).decode("utf-8")

            download_url = f"/download/{new_filename}"
            print("STEP 7 ✅: Conversion successful ✅")

            return jsonify({
                "message": "Image resized successfully",
                "final_size_kb": round(buffer.tell() / 1024, 2),
                "image_base64": base64_img,
                "download_url": download_url
            })

        except InvalidImageException as e:
            print("❌ InvalidImageException:", e)
            return jsonify({"error": str(e)}), 400

        except Exception as e:
            print("❌ Unexpected error:", e)
            import traceback
            traceback.print_exc()
            return jsonify({"error": "Image resize failed"}), 500

    # ✅ Static download route
    @app.route('/download/<path:filename>')
    def download_file(filename):
        output_folder = os.path.join(os.getcwd(), "static", "output")
        return send_from_directory(output_folder, filename, as_attachment=True)
