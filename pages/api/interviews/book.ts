// pages/api/interviews/book.ts
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
    const { timeSlotId, interviewId, candidateName, candidateEmail } = req.body;

    if (!timeSlotId || !interviewId || !candidateName || !candidateEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Verificar que el time slot existe y está disponible
    const timeSlot = await db.collection('timeslots').findOne({ 
      _id: new ObjectId(timeSlotId) 
    });

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    if (timeSlot.isBooked) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    // Verificar que la entrevista existe y está activa
    const interview = await db.collection('interviews').findOne({ 
      _id: new ObjectId(interviewId),
      isActive: true 
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found or inactive' });
    }

    // Crear reserva
    const reservation = {
      candidateId: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      recruiterId: interview.recruiterId,
      interviewId,
      timeSlotId,
      candidateName,
      candidateEmail,
      date: timeSlot.date,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      status: 'confirmed',
      createdAt: new Date(),
    };

    const reservationResult = await db.collection('reservations').insertOne(reservation);

    // Marcar time slot como reservado
    await db.collection('timeslots').updateOne(
      { _id: new ObjectId(timeSlotId) },
      { 
        $set: { 
          isBooked: true,
          bookedBy: candidateEmail,
          bookedAt: new Date()
        } 
      }
    );

    res.status(201).json({
      reservation: {
        id: reservationResult.insertedId.toString(),
        candidateId: reservation.candidateId,
        recruiterId: reservation.recruiterId,
        interviewId: reservation.interviewId,
        timeSlotId: reservation.timeSlotId,
        candidateName: reservation.candidateName,
        candidateEmail: reservation.candidateEmail,
        date: reservation.date,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: reservation.status,
        createdAt: reservation.createdAt,
      },
      timeSlotId,
      message: 'Time slot booked successfully',
    });
  } catch (error) {
    console.error('Book time slot error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}