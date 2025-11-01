from . import resize, crop, convert, grayscale, thumbnail, batch, compress

def register_routes(app):
    resize.init_app(app)
    crop.init_app(app)
    convert.init_app(app)
    grayscale.init_app(app)
    thumbnail.init_app(app)
    batch.init_app(app)
    compress.init_app(app)