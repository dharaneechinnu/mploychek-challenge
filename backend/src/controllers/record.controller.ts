import { Response } from 'express';
import { RecordModel } from '../models/record.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Admins see every record; general users only see non-restricted ones.
export async function listRecords(req: AuthRequest, res: Response): Promise<void> {
  const filter = req.auth!.role === 'admin' ? {} : { adminOnly: false };
  res.json(await RecordModel.find(filter).sort({ createdAt: 1 }));
}
