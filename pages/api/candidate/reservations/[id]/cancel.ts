// pages/api/candidate/reservations/[id]/cancel.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Reservation ID is required' });
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

    // Actualizar estado de la reserva a cancelado
    const result = await db.collection('reservations').updateOne(
      { _id: new ObjectId(id as string) },
      { 
        $set: { 
          status: 'cancelled',
          cancelledAt: new Date()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Failed to cancel reservation' });
    }

    // Liberar el time slot
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

    // Obtener la reserva actualizada para devolver
    const updatedReservation = await db.collection('reservations').findOne({ 
      _id: new ObjectId(id as string) 
    });

    res.status(200).json({
      reservation: {
        id: updatedReservation!._id.toString(),
        candidateId: updatedReservation!.candidateId,
        recruiterId: updatedReservation!.recruiterId,
        interviewId: updatedReservation!.interviewId,
        timeSlotId: updatedReservation!.timeSlotId,
        date: updatedReservation!.date,
        status: updatedReservation!.status,
        candidateName: updatedReservation!.candidateName,
        candidateEmail: updatedReservation!.candidateEmail,
        notes: updatedReservation!.notes,
        createdAt: updatedReservation!.createdAt,
      },
      message: 'Reservation cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}