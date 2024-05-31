// pages/api/login.js
import axios from 'axios';

export default async function handler(req, res) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, req.body);
  res.status(response.status).json(response.data);
}
