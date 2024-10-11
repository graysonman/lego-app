import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    // Get wishlist
    try {
      const wishlist = await prisma.wishlist.findUnique({
        where: { userId: String(userId) },
        include: { sets: true },
      });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  } else if (req.method === 'POST') {
    // Add to wishlist
    const { setId } = req.body;
    try {
      const wishlist = await prisma.wishlist.update({
        where: { userId: String(userId) },
        data: {
          sets: {
            connect: { id: setId },
          },
        },
      });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add to wishlist' });
    }
  } else if (req.method === 'DELETE') {
    // Remove from wishlist
    const { setId } = req.body;
    try {
      const wishlist = await prisma.wishlist.update({
        where: { userId: String(userId) },
        data: {
          sets: {
            disconnect: { id: setId },
          },
        },
      });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
  }
}