// pages/api/interviews/recruiter/[recruiterId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../utils/db';
import { ObjectId } from 'mongodb';

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

    // Obtener todas las entrevistas del reclutador
    const interviews = await db.collection('interviews')
      .find({ recruiterId })
      .sort({ createdAt: -1 })
      .toArray();

    // Para cada entrevista, obtener los time slots y contar reservas
    const interviewsWithDetails = await Promise.all(
      interviews.map(async (interview) => {
        const timeSlots = await db.collection('timeslots')
          .find({ interviewId: interview._id.toString() })
          .toArray();

        const reservations = await db.collection('reservations')
          .find({ interviewId: interview._id.toString() })
          .toArray();

        return {
          id: interview._id.toString(),
          recruiterId: interview.recruiterId,
          title: interview.title,
          description: interview.description,
          duration: interview.duration,
          isActive: interview.isActive,
          shareableUrl: interview.shareableUrl,
          createdAt: interview.createdAt,
          availableSlots: timeSlots.map(slot => ({
            id: slot._id.toString(),
            interviewId: slot.interviewId,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
            bookedBy: slot.bookedBy,
          })),
          stats: {
            totalSlots: timeSlots.length,
            bookedSlots: timeSlots.filter(slot => slot.isBooked).length,
            totalReservations: reservations.length,
          }
        };
      })
    );

    res.status(200).json({
      interviews: interviewsWithDetails,
      message: 'Interviews fetched successfully',
    });
  } catch (error) {
    console.error('Get recruiter interviews error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}