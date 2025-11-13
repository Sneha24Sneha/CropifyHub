import React, { useState } from "react";
import axios from "axios";

import FileInput from "../components/FileInput";
import Button from "../components/Button";
import ImagePreview from "../components/ImagePreview";
import ErrorMessage from "../components/ErrorMessage";

export default function Grayscale() {
    
    const [file, setFile] = useState(null);
    const [width, setWidth] = useState(150);
    const [height, setHeight] = useState(150);
    const [thumbnail, setThumbnail] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!file) {
            setError("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("width", width);
        formData.append("height", height);

        setLoading(true);
        setError("");
        setThumbnail(null);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/grayscale",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const { download_url } = response.data;

            setThumbnail(`http://127.0.0.1:5000${download_url}`); // preview ke liye
            setDownloadUrl(`http://127.0.0.1:5000${download_url}`); // download ke liye
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.error) setError(err.response.data.error);
            else setError("Thumbnail generation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body text-center p-4">
                            <h3 className="mb-4 text-primary fw-bold">🖼️ Convert Image form color to grayscale</h3>

                            {/* File Input */}
                            <FileInput label="Select Image" setFile={setFile} />

                            {/* Generate Button */}
                            <Button onClick={handleGenerate} loading={loading}>
                                Submit
                            </Button>

                            {/* Error Message */}
                            <ErrorMessage message={error} />

                            {/* Thumbnail Preview */}
                            {thumbnail && (
                                <ImagePreview imageUrl={thumbnail} downloadUrl={downloadUrl} downloadName="thumbnail.png" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
