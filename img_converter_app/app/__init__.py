from flask import Flask, jsonify, request
from app.routes import register_routes
from app.utils import setup_logger, InvalidImageException
from flask_cors import CORS
import os

logger = setup_logger()

def create_app(config_class):
    app = Flask(__name__)
    app.logger = logger

    app.config.from_object(config_class)

    # Enable CORS globally (adjust origins as needed)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Recomanded for production
    # CORS(app, resources={
    #     r"/api/*": {"origins": ["https://yourfrontend.com", "https://admin.yourfrontend.com"]}
    # })

    app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Global request logging
    @app.before_request
    def log_request_info():
        app.logger.info(f"{request.method} {request.path} from {request.remote_addr}")

    register_routes(app)
    register_error_handlers(app)

    return app

def register_error_handlers(app):
    @app.errorhandler(InvalidImageException)
    def handle_invalid_image(error):
        app.logger.warning(f"InvalidImageException: {error.message}")
        return jsonify({"error": error.message}), 400

    @app.errorhandler(400)
    def bad_request(error):
        app.logger.error(f"400 Bad Request: {error}")
        return jsonify({"error": "Bad Request"}), 400

    @app.errorhandler(404)
    def not_found(error):
        app.logger.error(f"404 Not Found: {error}")
        return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.exception("500 Internal Server Error")
        return jsonify({"error": "Internal Server Error"}), 500
