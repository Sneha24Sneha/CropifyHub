import logging
import os

def setup_logger(log_path="logs/api.log"):
    os.makedirs(os.path.dirname(log_path), exist_ok=True)

    logger = logging.getLogger("image-api")
    logger.setLevel(logging.DEBUG)

    if not logger.handlers:
        # File handler
        file_handler = logging.FileHandler(log_path)
        file_handler.setLevel(logging.DEBUG)

        # Formatter
        formatter = logging.Formatter('%(asctime)s | %(levelname)s | %(message)s')
        file_handler.setFormatter(formatter)

        # Add handler
        logger.addHandler(file_handler)

    return logger
