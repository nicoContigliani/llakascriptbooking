// pages/api/candidate/available-slots.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Obtener time slots disponibles (futuros y no reservados)
    const timeSlots = await db.collection('timeslots')
      .find({ 
        isBooked: false,
        date: { $gte: new Date() } // Solo slots futuros
      })
      .sort({ date: 1, startTime: 1 })
      .toArray();

    console.log(`Found ${timeSlots.length} available time slots`);

    // Obtener información adicional de las entrevistas
    const availableSlots = await Promise.all(
      timeSlots.map(async (slot) => {
        let interviewTitle = 'Unknown Interview';
        let recruiterName = 'Unknown Recruiter';
        let duration = 60;
        let isActive = true;

        try {
          const interview = await db.collection('interviews').findOne({ 
            _id: new ObjectId(slot.interviewId) 
          });
          
          if (interview) {
            interviewTitle = interview.title;
            duration = interview.duration || 60;
            isActive = interview.isActive !== false; // default to true if not set
            
            const recruiter = await db.collection('users').findOne({ 
              _id: new ObjectId(interview.recruiterId) 
            });
            recruiterName = recruiter?.name || 'Unknown Recruiter';
          }
        } catch (error) {
          console.error('Error fetching interview details:', error);
        }

        // Calcular endTime basado en la duración si no existe
        let endTime = slot.endTime;
        if (!endTime && slot.startTime) {
          const startTime = new Date(`2000-01-01T${slot.startTime}`);
          startTime.setMinutes(startTime.getMinutes() + duration);
          endTime = startTime.toTimeString().slice(0, 5);
        }

        return {
          id: slot._id.toString(),
          interviewId: slot.interviewId,
          date: slot.date,
          startTime: slot.startTime,
          endTime: endTime,
          interviewTitle,
          recruiterName,
          duration,
          isActive,
        };
      })
    );

    // Filtrar solo entrevistas activas
    const activeSlots = availableSlots.filter(slot => slot.isActive);

    console.log(`Returning ${activeSlots.length} active available slots`);

    res.status(200).json({
      availableSlots: activeSlots,
      message: 'Available slots fetched successfully',
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({ 
      availableSlots: [],
      message: 'Internal server error' 
    });
  }
}