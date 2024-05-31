// pages/upload.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [publishAt, setPublishAt] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('publishAt', publishAt);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });
      router.push('/images');
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="border p-2"
          />
        </div>
        <div>
          <label>Publish At</label>
          <input
            type="datetime-local"
            value={publishAt}
            onChange={(e) => setPublishAt(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Upload</button>
      </form>
    </div>
  );
}
