// // pages/api/candidate/reservations/[id]/reschedule.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../../../utils/db';
// import { ObjectId } from 'mongodb';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { id } = req.query;
//     const { reason } = req.body;

//     if (!id || !reason) {
//       return res.status(400).json({ message: 'Reservation ID and reason are required' });
//     }

//     const client = await clientPromise;
//     const db = client.db();

//     // Actualizar estado de la reserva a rescheduled y guardar la razón
//     const result = await db.collection('reservations').updateOne(
//       { _id: new ObjectId(id as string) },
//       { 
//         $set: { 
//           status: 'rescheduled',
//           rescheduleReason: reason,
//           rescheduleRequestedAt: new Date()
//         } 
//       }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ message: 'Reservation not found' });
//     }

//     // Aquí podrías enviar un email al reclutador notificando la solicitud de reprogramación

//     res.status(200).json({
//       message: 'Reschedule request sent successfully',
//     });
//   } catch (error) {
//     console.error('Reschedule request error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


// pages/api/candidate/reservations/[id]/reschedule.ts
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
    const { reason } = req.body;

    if (!id || !reason) {
      return res.status(400).json({ message: 'Reservation ID and reason are required' });
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

    // Actualizar estado de la reserva a rescheduled y guardar la razón
    const result = await db.collection('reservations').updateOne(
      { _id: new ObjectId(id as string) },
      { 
        $set: { 
          status: 'rescheduled',
          rescheduleReason: reason,
          rescheduleRequestedAt: new Date()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Failed to send reschedule request' });
    }

    res.status(200).json({
      message: 'Reschedule request sent successfully',
    });
  } catch (error) {
    console.error('Reschedule request error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}