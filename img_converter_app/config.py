# config.py

import os

class Config:
    DEBUG = False
    TESTING = False
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key')

class DevelopmentConfig(Config):
    DEBUG = True
    ENV = 'development'

class ProductionConfig(Config):
    DEBUG = False
    ENV = 'production'

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    ENV = 'testing'
