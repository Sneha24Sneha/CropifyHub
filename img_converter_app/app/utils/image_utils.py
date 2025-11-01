import os
from flask import current_app, send_file
from PIL import Image
from io import BytesIO
import base64

def image_to_base64(img, format="PNG"):
    buffer = BytesIO()
    img.save(buffer, format=format)
    buffer.seek(0)
    encoded = base64.b64encode(buffer.read()).decode("utf-8")
    return encoded

def save_image(file, filename, convert_mode=None):
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(path)
    img = Image.open(path)
    if convert_mode:
        img = img.convert(convert_mode)
    return img, path

def send_image(img, output_filename, format=None):
    output_path = os.path.join(current_app.config['UPLOAD_FOLDER'], output_filename)
    if format:
        img.save(output_path, format=format)
    else:
        img.save(output_path)
    return send_file(output_path, as_attachment=True)

def load_image(file, convert_mode=None):
    img = Image.open(file)
    if convert_mode:
        img = img.convert(convert_mode)
    return img
