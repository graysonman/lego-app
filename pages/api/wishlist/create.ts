import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  try {
    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
      },
    });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create wishlist' });
  }
}