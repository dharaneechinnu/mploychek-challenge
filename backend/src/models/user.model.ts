import { Schema, model, InferSchemaType } from 'mongoose';

export const ROLES = ['admin', 'user'] as const;

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: 'user' },
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export type UserDoc = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
