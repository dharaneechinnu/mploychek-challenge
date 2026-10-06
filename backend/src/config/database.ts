import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { RecordModel } from '../models/record.model';

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/mploychek';
  await mongoose.connect(uri);
  console.log('MongoDB connected');
  await seed();
}

// Populates demo users and records the first time the database is empty.
async function seed(): Promise<void> {
  if ((await User.countDocuments()) === 0) {
    await User.create([
      { userId: 'admin', name: 'Ava Admin', password: await bcrypt.hash('admin123', 10), role: 'admin' },
      { userId: 'user', name: 'Gus General', password: await bcrypt.hash('user123', 10), role: 'user' },
    ]);
    console.log('Seeded users: admin/admin123, user/user123');
  }

  if ((await RecordModel.countDocuments()) === 0) {
    await RecordModel.create([
      { title: 'Office Wi-Fi rollout', category: 'Operations', status: 'Active', amount: 4200, adminOnly: false },
      { title: 'Q3 marketing campaign', category: 'Marketing', status: 'Completed', amount: 15800, adminOnly: false },
      { title: 'Customer survey analysis', category: 'Research', status: 'Pending', amount: 2300, adminOnly: false },
      { title: 'Website redesign', category: 'Design', status: 'Active', amount: 9600, adminOnly: false },
      { title: 'Intern onboarding kit', category: 'HR', status: 'Completed', amount: 1200, adminOnly: false },
      { title: 'Payroll audit', category: 'Finance', status: 'Active', amount: 48000, adminOnly: true },
      { title: 'Executive compensation review', category: 'HR', status: 'Pending', amount: 125000, adminOnly: true },
      { title: 'Vendor contract renegotiation', category: 'Legal', status: 'Active', amount: 72000, adminOnly: true },
    ]);
    console.log('Seeded records');
  }
}
