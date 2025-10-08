// pages/api/interviews/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Interview ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    if (req.method === 'DELETE') {
      // Verificar que la entrevista existe
      const interview = await db.collection('interviews').findOne({ 
        _id: new ObjectId(id) 
      });

      if (!interview) {
        return res.status(404).json({ message: 'Interview not found' });
      }

      // Eliminar la entrevista y todos sus time slots y reservas relacionados
      await db.collection('interviews').deleteOne({ _id: new ObjectId(id) });
      await db.collection('timeslots').deleteMany({ interviewId: id });
      await db.collection('reservations').deleteMany({ interviewId: id });

      res.status(200).json({ 
        message: 'Interview deleted successfully',
        interviewId: id 
      });
    } else if (req.method === 'PUT') {
      const updateData = req.body;

      // Verificar que la entrevista existe
      const existingInterview = await db.collection('interviews').findOne({ 
        _id: new ObjectId(id) 
      });

      if (!existingInterview) {
        return res.status(404).json({ message: 'Interview not found' });
      }

      // Actualizar la entrevista
      const result = await db.collection('interviews').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'No changes made to interview' });
      }

      // Obtener la entrevista actualizada
      const updatedInterview = await db.collection('interviews').findOne({ 
        _id: new ObjectId(id) 
      });

      res.status(200).json({ 
        message: 'Interview updated successfully',
        interview: {
          id: updatedInterview!._id.toString(),
          recruiterId: updatedInterview!.recruiterId,
          title: updatedInterview!.title,
          description: updatedInterview!.description,
          duration: updatedInterview!.duration,
          isActive: updatedInterview!.isActive,
          shareableUrl: updatedInterview!.shareableUrl,
          createdAt: updatedInterview!.createdAt,
        }
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Interview operation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}