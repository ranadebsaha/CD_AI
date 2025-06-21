import React, { useState, useRef } from 'react';
import Loader from '../components/Loader';

const LiveDetectionPage = () => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>('');
  const streamInput = useRef<HTMLInputElement>(null);

  const handleStartDetection = async () => {
    const url = streamInput.current?.value.trim();
    if (!url) return alert('Enter RTSP/HTTP stream URL');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('url', url);

      const res = await fetch('http://localhost:5000/stream/live', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setOutputUrl(`http://localhost:5000/get_video/${data.filename}`);
    } catch (err) {
      alert("Live stream processing failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Live Stream Detection</h1>
      <input
        ref={streamInput}
        type="text"
        placeholder="Enter RTSP/HTTP Stream URL"
        className="border px-3 py-2 w-full rounded mb-4"
      />
      <button
        onClick={handleStartDetection}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Detection
      </button>

      {loading && <Loader />}

      {outputUrl && (
        <div className="mt-6 space-y-4">
          <video src={outputUrl} controls className="w-full rounded" />
          <a
            href={outputUrl}
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

export default LiveDetectionPage;
