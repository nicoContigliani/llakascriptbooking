import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../utils/db';
import { RegisterCredentials } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name, role }: RegisterCredentials = req.body;

    // Validaciones básicas
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const client = await clientPromise;
    const db = client.db();

    // Verificar si el usuario ya existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = {
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(user);

    // Crear respuesta sin password
    const userResponse = {
      id: result.insertedId.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };

    // En un sistema real, aquí generarías un JWT
    const token = `fake-jwt-token-${Date.now()}`;

    res.status(201).json({
      user: userResponse,
      token,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}