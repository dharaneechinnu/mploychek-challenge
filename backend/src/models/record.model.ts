import { Schema, model } from 'mongoose';

const recordSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Pending', 'Completed'], required: true },
    amount: { type: Number, required: true },
    // Restricted records are only returned to admins.
    adminOnly: { type: Boolean, default: false },
  },
  { timestamps: true },
);

recordSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const RecordModel = model('Record', recordSchema);
