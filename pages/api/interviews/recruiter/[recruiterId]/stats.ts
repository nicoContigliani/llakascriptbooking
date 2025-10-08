// pages/api/interviews/recruiter/[recruiterId]/stats.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { recruiterId } = req.query;

    if (!recruiterId) {
      return res.status(400).json({ message: 'Recruiter ID is required' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Obtener estadísticas
    const totalInterviews = await db.collection('interviews')
      .countDocuments({ recruiterId });

    const activeInterviews = await db.collection('interviews')
      .countDocuments({ recruiterId, isActive: true });

    const totalReservations = await db.collection('reservations')
      .countDocuments({ recruiterId });

    const todayReservations = await db.collection('reservations')
      .countDocuments({ 
        recruiterId,
        date: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      });

    res.status(200).json({
      stats: {
        totalInterviews,
        activeInterviews,
        totalReservations,
        todayReservations,
      },
      message: 'Stats fetched successfully',
    });
  } catch (error) {
    console.error('Get recruiter stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}