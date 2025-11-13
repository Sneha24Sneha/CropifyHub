import React, { useRef, useState } from "react";
import { Cropper } from "react-cropper";

function Crop() {
  const cropperRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCroppedImage(null); // reset old result
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async (e) => {
    e.preventDefault();
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return alert("Cropper not ready!");

    const canvas = cropper.getCroppedCanvas();
    if (!canvas) return alert("Please select crop area first!");

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const data = cropper.getData();

    const formData = new FormData();
    formData.append("image", blob, "original.png");
    formData.append("x", data.x);
    formData.append("y", data.y);
    formData.append("width", data.width);
    formData.append("height", data.height);

    try {
      const res = await fetch("http://localhost:5000/api/crop", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.error) throw new Error(result.error);

      setCroppedImage(`data:image/png;base64,${result.image_base64}`);
    } catch (err) {
      console.error(err);
      alert("Cropping failed: " + err.message);
    }
  };

  return (
    <>
      <div className="container text-center mt-4">
        <h2>Upload and Crop Image</h2>

        <form onSubmit={handleCrop}>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="form-control w-50 mx-auto mb-3"
          />
          <button type="submit" className="btn btn-primary">
            Crop & Upload
          </button>
        </form>

        {imageSrc && (
          <div className="mt-4">
            <Cropper
              ref={cropperRef}
              src={imageSrc}
              style={{ height: 400, width: "100%" }}
              aspectRatio={NaN}
              guides={true}
              viewMode={1}
              autoCropArea={0.6}
              background={false}
              responsive={true}
              checkOrientation={false}
            />
          </div>
        )}

        {croppedImage && (
          <div className="mt-4">
            <h4>Cropped Result</h4>
            <img
              src={croppedImage}
              alt="Cropped"
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={() => {
                try {
                  const arr = croppedImage.split(',');
                  const mime = arr[0].match(/:(.*?);/)[1];
                  const bstr = atob(arr[1]);
                  let n = bstr.length;
                  const u8arr = new Uint8Array(n);
                  while (n--) u8arr[n] = bstr.charCodeAt(n);
                  const blob = new Blob([u8arr], { type: mime });

                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "cropped.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error("Download failed:", err);
                }
              }}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Crop;
