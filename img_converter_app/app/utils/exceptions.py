class InvalidImageException(Exception):
    def __init__(self, message="Invalid image file"):
        self.message = message
        super().__init__(self.message)
