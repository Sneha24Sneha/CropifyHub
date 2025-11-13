# 🖼️ Image Processing Web App

A full-stack web application for performing common image processing operations — including "cropping", "thumbnail creation", "color-to-grayscale conversion", and "image size reduction".  

Built using "Python (Flask)" for the backend, "React.js" for the frontend, and "Docker" for easy deployment.

## 📷 Screenshots
![App Screenshot](img-crop-home.png)

## 🚀 Features

- ✂️ "Image Cropping" — Select and crop specific regions of images.  
- 🧩 "Thumbnail Generator" — Automatically generate thumbnails for uploaded images.  
- 🎨 "Color → Grayscale" — Convert colored images to grayscale instantly.  
- 📉 "Image Size Reducer" — Compress or resize images while maintaining quality.  
- 📦 "Docker Support" — Run the app anywhere with a single Docker command.  
- 🌐 "Modern UI" — Built with React for a smooth user experience.



## 🧰 Tech Stack

| Layer              | Technology             |
|--------------------|------------------------|
| "Frontend"         | React.js, HTML5, CSS3  |
| "Backend"          | Python (Flask)         |
| "Image Processing" | Pillow (PIL)           |
| "Containerization" | Docker, Docker Compose |
| "Version Control"  | Git & GitHub           |



## Run with Docker

```base
docker-compose up --build
```

## API Endpoints (Example)

| Endpoint     | Method | Description                      |
| ------------ | ------ | -------------------------------- |
| '/upload'    | POST   | Upload an image                  |
| '/crop'      | POST   | Crop image (x, y, width, height) |
| '/thumbnail' | POST   | Generate a thumbnail             |
| '/grayscale' | POST   | Convert image to grayscale       |
| '/resize'    | POST   | Resize or compress image         |


