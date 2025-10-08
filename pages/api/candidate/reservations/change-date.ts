// pages/api/candidate/reservations/[id]/change-date.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { newTimeSlotId } = req.body;

    if (!id || !newTimeSlotId) {
      return res.status(400).json({ message: 'Reservation ID and new time slot ID are required' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Verificar que la reserva existe
    const reservation = await db.collection('reservations').findOne({ 
      _id: new ObjectId(id as string) 
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Verificar que el nuevo time slot existe y está disponible
    const newTimeSlot = await db.collection('timeslots').findOne({ 
      _id: new ObjectId(newTimeSlotId),
      isBooked: false 
    });

    if (!newTimeSlot) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }

    // Liberar el time slot anterior
    await db.collection('timeslots').updateOne(
      { _id: new ObjectId(reservation.timeSlotId) },
      { 
        $set: { 
          isBooked: false,
          bookedBy: null,
          bookedAt: null
        } 
      }
    );

    // Reservar el nuevo time slot
    await db.collection('timeslots').updateOne(
      { _id: new ObjectId(newTimeSlotId) },
      { 
        $set: { 
          isBooked: true,
          bookedBy: reservation.candidateEmail,
          bookedAt: new Date()
        } 
      }
    );

    // Actualizar la reserva con el nuevo time slot
    const updatedReservation = await db.collection('reservations').findOneAndUpdate(
      { _id: new ObjectId(id as string) },
      { 
        $set: { 
          timeSlotId: newTimeSlotId,
          date: newTimeSlot.date,
          startTime: newTimeSlot.startTime,
          endTime: newTimeSlot.endTime,
          interviewId: newTimeSlot.interviewId,
          status: 'confirmed',
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    res.status(200).json({
      reservation: {
        id: updatedReservation!._id.toString(),
        timeSlotId: updatedReservation!.timeSlotId,
        date: updatedReservation!.date,
        startTime: updatedReservation!.startTime,
        endTime: updatedReservation!.endTime,
      },
      message: 'Interview date changed successfully',
    });
  } catch (error) {
    console.error('Change date error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}