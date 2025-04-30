
import { useState } from "react";

export default function HeyGemWeb() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://heygemai-production.up.railway.app/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error", err);
      setResult({ error: "Upload failed." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">HeyGem Web Uploader</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading ? "Uploading..." : "Upload & Generate"}
      </button>
      {result && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
