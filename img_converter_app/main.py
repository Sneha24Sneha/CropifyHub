from app import create_app
from config import DevelopmentConfig, ProductionConfig

app = create_app(DevelopmentConfig)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config['DEBUG']  # <- Use config value here
    )
