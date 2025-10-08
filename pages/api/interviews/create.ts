import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/db';
import { InterviewStructure, TimeSlot } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { recruiterId, title, description, duration, availableSlots } = req.body;

    if (!recruiterId || !title || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Generar URL única
    const shareableUrl = `interview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Crear entrevista
    const interview = {
      recruiterId,
      title,
      description,
      duration,
      isActive: true,
      shareableUrl,
      createdAt: new Date(),
    };

    const interviewResult = await db.collection('interviews').insertOne(interview);
    const interviewId = interviewResult.insertedId.toString();

    // Crear time slots
    const timeSlotsToInsert = availableSlots.map((slot: any) => ({
      interviewId,
      date: new Date(slot.date),
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: false,
      createdAt: new Date(),
    }));

    if (timeSlotsToInsert.length > 0) {
      await db.collection('timeslots').insertMany(timeSlotsToInsert);
    }

    // Obtener la entrevista creada con sus time slots
    const createdInterview = await db.collection('interviews').findOne({ _id: interviewResult.insertedId });
    const timeSlots = await db.collection('timeslots').find({ interviewId }).toArray();

    res.status(201).json({
      interview: {
        id: createdInterview!._id.toString(),
        recruiterId: createdInterview!.recruiterId,
        title: createdInterview!.title,
        description: createdInterview!.description,
        duration: createdInterview!.duration,
        isActive: createdInterview!.isActive,
        shareableUrl: createdInterview!.shareableUrl,
        createdAt: createdInterview!.createdAt,
      },
      timeSlots: timeSlots.map(slot => ({
        id: slot._id.toString(),
        interviewId: slot.interviewId,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      })),
      message: 'Interview created successfully',
    });
  } catch (error) {
    console.error('Create interview error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}