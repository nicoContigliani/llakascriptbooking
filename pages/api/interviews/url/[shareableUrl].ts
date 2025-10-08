import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { shareableUrl } = req.query;

    const client = await clientPromise;
    const db = client.db();

    // Buscar entrevista por URL
    const interview = await db.collection('interviews').findOne({ 
      shareableUrl,
      isActive: true 
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found or inactive' });
    }

    // Obtener time slots disponibles
    const timeSlots = await db.collection('timeslots')
      .find({ 
        interviewId: interview._id.toString(),
        isBooked: false,
        date: { $gte: new Date() } // Solo slots futuros
      })
      .sort({ date: 1, startTime: 1 })
      .toArray();

    res.status(200).json({
      interview: {
        id: interview._id.toString(),
        recruiterId: interview.recruiterId,
        title: interview.title,
        description: interview.description,
        duration: interview.duration,
        isActive: interview.isActive,
        shareableUrl: interview.shareableUrl,
        createdAt: interview.createdAt,
      },
      timeSlots: timeSlots.map(slot => ({
        id: slot._id.toString(),
        interviewId: slot.interviewId,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      })),
    });
  } catch (error) {
    console.error('Get interview by URL error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}