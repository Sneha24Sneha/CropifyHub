# Lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Pillow
RUN apt-get update && apt-get install -y \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy only app files (exclude uploads, __pycache__, etc.)
COPY app.py .
COPY templates ./templates
COPY static ./static

# Create uploads folder
RUN mkdir uploads

# Expose port
EXPOSE 5001

# Run the app
CMD ["python", "app.py"]
