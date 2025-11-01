from app import create_app
from config import DevelopmentConfig, ProductionConfig
from flask_cors import CORS

app = create_app(DevelopmentConfig)
CORS(app)

#CORS(app, resources={r"/*": {"origins": ["https://yourfrontend.com"]}})

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config['DEBUG']  # <- Use config value here
    )
