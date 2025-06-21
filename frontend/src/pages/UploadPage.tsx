import React, { useState } from 'react';
import Loader from '../components/Loader';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setProcessedUrl('');
    setDownloadUrl('');
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const endpoint = file.type.startsWith('image')
      ? 'http://localhost:5000/upload/image'
      : 'http://localhost:5000/upload/video';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (file.type.startsWith('image')) {
        const filename = data.image_url.split('/').pop();
        setProcessedUrl(`http://localhost:5000${data.image_url}`);
        setDownloadUrl(`http://localhost:5000/download_image/${filename}`);
      } else {
        const filename = data.video_url.split('/').pop();
        setProcessedUrl(`http://localhost:5000${data.video_url}`);
        setDownloadUrl(`http://localhost:5000/download_video/${filename}`);
      }
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Upload Photo or Video</h1>

      <input
        type="file"
        accept=".jpg,.jpeg,.png,.mp4"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Upload & Process
      </button>

      {loading && <Loader />}

      {processedUrl && (
        <div className="mt-6 space-y-4">
          {/* {file?.type.startsWith('image') ? (
            <img src={processedUrl} alt="Processed" className="w-full rounded" />
          ) : (
            <video src={processedUrl} controls className="w-full rounded" />
          )} */}
          <a
            href={downloadUrl}
            download
            className="inline-block px-4 py-2 bg-green-600 text-white rounded"
          >
            Download Result
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
