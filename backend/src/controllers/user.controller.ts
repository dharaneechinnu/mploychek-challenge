import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, ROLES } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  const user = await User.findById(req.auth!.sub);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}

export async function listUsers(_req: AuthRequest, res: Response): Promise<void> {
  res.json(await User.find().sort({ createdAt: 1 }));
}

export async function createUser(req: AuthRequest, res: Response): Promise<void> {
  const { userId, name, password, role } = req.body ?? {};
  if (!userId || !name || !password) {
    res.status(400).json({ message: 'User ID, name and password are required' });
    return;
  }
  if (role && !ROLES.includes(role)) {
    res.status(400).json({ message: 'Invalid role' });
    return;
  }
  if (await User.exists({ userId })) {
    res.status(409).json({ message: 'User ID already exists' });
    return;
  }
  const user = await User.create({ userId, name, role, password: await bcrypt.hash(password, 10) });
  res.status(201).json(user);
}

export async function updateUser(req: AuthRequest, res: Response): Promise<void> {
  const { name, password, role } = req.body ?? {};
  if (role && !ROLES.includes(role)) {
    res.status(400).json({ message: 'Invalid role' });
    return;
  }
  if (req.params.id === req.auth!.sub && role && role !== 'admin') {
    res.status(400).json({ message: 'You cannot remove your own admin role' });
    return;
  }
  const update: Record<string, unknown> = {};
  if (name) update.name = name;
  if (role) update.role = role;
  if (password) update.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}

export async function deleteUser(req: AuthRequest, res: Response): Promise<void> {
  if (req.params.id === req.auth!.sub) {
    res.status(400).json({ message: 'You cannot delete your own account' });
    return;
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(204).end();
}
