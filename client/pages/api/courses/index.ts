import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { title } = req.body;
      const userStr = req.headers.user as string;
      const user = userStr ? JSON.parse(userStr) : null;
      const userId = user?._id;

      const response = await axios.post(`${process.env.BACK_END_URL}/api/courses`, {
        userId,
        title,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("[COURSES]", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  }

  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const response = await axios.get(`${process.env.BACK_END_URL}/api/courses`, {
        headers: {
          Authorization: token
        }
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("[COURSES]", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}