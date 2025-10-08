import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../utils/db';
import { LoginCredentials } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password }: LoginCredentials = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Buscar usuario
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Crear respuesta sin password
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };

    // En un sistema real, aquí generarías un JWT
    const token = `fake-jwt-token-${Date.now()}`;

    res.status(200).json({
      user: userResponse,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}