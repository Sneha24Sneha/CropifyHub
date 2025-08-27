from flask import Flask, render_template, request, send_file
from PIL import Image
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)




# --- Helper functions ---
def save_image(file, filename, convert_mode=None):
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)
    img = Image.open(path)
    if convert_mode:
        img = img.convert(convert_mode)
    return img, path

def send_image(img, output_filename, format=None):
    output_path = os.path.join(UPLOAD_FOLDER, output_filename)
    if format:
        img.save(output_path, format=format)
    else:
        img.save(output_path)
    return send_file(output_path, as_attachment=True)


    # --- Routes ---

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/resize", methods=["GET", "POST"])
def resize_image():
    if request.method == "POST":
        file = request.files["image"]
        width = int(request.form["width"])
        height = int(request.form["height"])

        img, _ = save_image(file, file.filename)
        img = img.resize((width, height))
        return send_image(img, f"resized_{file.filename}")

    return render_template("resize.html")


    if request.method == "POST":
        file = request.files["image"]
        x = int(float(request.form["x"]))
        y = int(float(request.form["y"]))
        width = int(float(request.form["width"]))
        height = int(float(request.form["height"]))

        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)

        img = Image.open(path)
        cropped = img.crop((x, y, x + width, y + height))
        output_path = os.path.join(UPLOAD_FOLDER, "cropped_" + file.filename)
        cropped.save(output_path)

        return send_file(output_path, as_attachment=True)

    return render_template("crop.html")

    if request.method == "POST":
        file = request.files["image"]
        x = int(request.form["x"])
        y = int(request.form["y"])
        width = int(request.form["width"])
        height = int(request.form["height"])

        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)

        img = Image.open(path)
        cropped_img = img.crop((x, y, x + width, y + height))  # (left, top, right, bottom)
        output_path = os.path.join(UPLOAD_FOLDER, "cropped_" + file.filename)
        cropped_img.save(output_path)

        return send_file(output_path, as_attachment=True)

    return render_template("crop.html")

@app.route("/crop", methods=["GET", "POST"])
def crop_image():
    if request.method == "POST":
        file = request.files["image"]
        x = int(float(request.form["x"]))
        y = int(float(request.form["y"]))
        width = int(float(request.form["width"]))
        height = int(float(request.form["height"]))

        img, _ = save_image(file, file.filename)
        cropped = img.crop((x, y, x + width, y + height))
        return send_image(cropped, f"cropped_{file.filename}")

    return render_template("crop.html")


#     if request.method == "POST":
#         file = request.files["image"]
#         format = request.form["format"].upper()

#         # PIL ke liye JPG ko JPEG me map karna hoga
#         if format == "JPG":
#             format = "JPEG"

#         path = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(path)

#         img = Image.open(path).convert("RGB")  # safe conversion
#         base, _ = os.path.splitext(file.filename)
#         output_filename = f"{base}.{format.lower() if format != 'JPEG' else 'jpg'}"
#         output_path = os.path.join(UPLOAD_FOLDER, output_filename)

#         img.save(output_path, format=format)

#         return send_file(output_path, as_attachment=True)

#     return render_template("convert.html")


@app.route("/convert", methods=["GET", "POST"])
def convert_image():
    if request.method == "POST":
        file = request.files["image"]
        fmt = request.form["format"].upper()
        if fmt == "JPG":
            fmt = "JPEG"

        img, _ = save_image(file, file.filename, convert_mode="RGB")
        base, _ = os.path.splitext(file.filename)
        out_name = f"{base}.{fmt.lower() if fmt != 'JPEG' else 'jpg'}"
        return send_image(img, out_name, format=fmt)

    return render_template("convert.html")


@app.route("/thumbnail", methods=["GET", "POST"])
def thumbnail_image():
    if request.method == "POST":
        file = request.files["image"]
        img, _ = save_image(file, file.filename)
        out_name = f"thumb_{file.filename}"
        return send_image(img, out_name)

    return render_template("thumbnail.html")

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename))


@app.route("/batch", methods=["GET", "POST"])
def batch_process():
    if request.method == "GET":
        return render_template("batch.html") 

   
    files = request.files.getlist("images")
    formats = request.form.getlist("formats")
    
  
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
