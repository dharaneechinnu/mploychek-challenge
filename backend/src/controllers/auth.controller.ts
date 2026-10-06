import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { jwtSecret } from '../middleware/auth.middleware';

export async function login(req: Request, res: Response): Promise<void> {
  const { userId, password, role } = req.body ?? {};
  if (!userId || !password || !role) {
    res.status(400).json({ message: 'User ID, password and role are required' });
    return;
  }

  const user = await User.findOne({ userId }).select('+password');
  const valid = user && (await bcrypt.compare(password, user.password));
  if (!user || !valid || user.role !== role) {
    res.status(401).json({ message: 'Invalid credentials or role' });
    return;
  }

  const token = jwt.sign({ sub: String(user._id), role: user.role }, jwtSecret(), { expiresIn: '2h' });
  res.json({ token, user });
}
