// pages/api/candidate/reservations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/db';
import { ObjectId } from 'mongodb';
import { Reservation } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { candidateEmail } = req.query;

    if (!candidateEmail) {
      return res.status(400).json({ message: 'Candidate email is required' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Obtener reservas del candidato
    const reservations = await db.collection('reservations')
      .find({ candidateEmail: candidateEmail as string })
      .sort({ date: 1, startTime: 1 })
      .toArray();

    // Obtener información adicional de las entrevistas y reclutadores
    const reservationsWithDetails = await Promise.all(
      reservations.map(async (reservation) => {
        let interviewTitle = 'Unknown Interview';
        let recruiterName = 'Unknown Recruiter';
        let duration = 60;

        try {
          const interview = await db.collection('interviews').findOne({ 
            _id: new ObjectId(reservation.interviewId) 
          });
          interviewTitle = interview?.title || 'Unknown Interview';
          duration = interview?.duration || 60;

          const recruiter = await db.collection('users').findOne({ 
            _id: new ObjectId(reservation.recruiterId) 
          });
          recruiterName = recruiter?.name || 'Unknown Recruiter';
        } catch (error) {
          console.error('Error fetching interview or recruiter details:', error);
        }

        // Calcular endTime basado en la duración si no existe
        let endTime = reservation.endTime;
        if (!endTime && reservation.startTime) {
          const startTime = new Date(`2000-01-01T${reservation.startTime}`);
          startTime.setMinutes(startTime.getMinutes() + duration);
          endTime = startTime.toTimeString().slice(0, 5);
        }

        const reservationWithDetails: Reservation & {
          interviewTitle: string;
          recruiterName: string;
          startTime: string;
          endTime: string;
          rescheduleReason?: string;
        } = {
          id: reservation._id.toString(),
          candidateId: reservation.candidateId,
          recruiterId: reservation.recruiterId,
          interviewId: reservation.interviewId,
          timeSlotId: reservation.timeSlotId,
          date: reservation.date,
          status: reservation.status,
          candidateName: reservation.candidateName,
          candidateEmail: reservation.candidateEmail,
          notes: reservation.notes,
          createdAt: reservation.createdAt,
          interviewTitle,
          recruiterName,
          startTime: reservation.startTime,
          endTime: endTime,
          rescheduleReason: reservation.rescheduleReason,
        };

        return reservationWithDetails;
      })
    );

    res.status(200).json({
      reservations: reservationsWithDetails,
      message: 'Reservations fetched successfully',
    });
  } catch (error) {
    console.error('Get candidate reservations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}