// pages/images.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Images() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/images', {
        headers: {
          'Authorization': token,
        },
      });
      setImages(response.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-6">
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.url} alt="Uploaded" className="w-40 h-40" />
            <p>Status: {image.status}</p>
            <p>Publish At: {new Date(image.publishAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
