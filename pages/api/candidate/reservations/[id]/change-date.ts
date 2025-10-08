// pages/api/candidate/reservations/[id]/change-date.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../../utils/db';
import { ObjectId } from 'mongodb';
import { Reservation } from '../../../../../types';

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

    // Obtener información de la nueva entrevista
    const newInterview = await db.collection('interviews').findOne({ 
      _id: new ObjectId(newTimeSlot.interviewId) 
    });

    if (!newInterview) {
      return res.status(400).json({ message: 'Interview not found for selected time slot' });
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

    // Actualizar la reserva con el nuevo time slot y entrevista
    const updateResult = await db.collection('reservations').updateOne(
      { _id: new ObjectId(id as string) },
      { 
        $set: { 
          timeSlotId: newTimeSlotId,
          interviewId: newTimeSlot.interviewId,
          recruiterId: newInterview.recruiterId,
          date: newTimeSlot.date,
          status: 'confirmed',
          updatedAt: new Date()
        } 
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ message: 'Failed to update reservation' });
    }

    // Obtener la reserva actualizada con toda la información
    const updatedReservation = await db.collection('reservations').findOne({ 
      _id: new ObjectId(id as string) 
    });

    // Obtener información adicional para la respuesta
    const interview = await db.collection('interviews').findOne({ 
      _id: new ObjectId(updatedReservation!.interviewId) 
    });

    const recruiter = await db.collection('users').findOne({ 
      _id: new ObjectId(updatedReservation!.recruiterId) 
    });

    const responseReservation: Reservation = {
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
    };

    res.status(200).json({
      reservation: responseReservation,
      interviewTitle: interview?.title || 'Unknown Interview',
      recruiterName: recruiter?.name || 'Unknown Recruiter',
      message: 'Interview date changed successfully',
    });
  } catch (error) {
    console.error('Change date error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}