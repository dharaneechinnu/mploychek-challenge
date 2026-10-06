import { Request, Response, NextFunction } from 'express';

const MAX_DELAY_MS = 10000;

// Delays the response by ?delay=<ms> (capped) to simulate a slow API.
export function delay(req: Request, _res: Response, next: NextFunction): void {
  const ms = Math.min(Math.max(Number(req.query.delay) || 0, 0), MAX_DELAY_MS);
  if (ms === 0) return next();
  setTimeout(next, ms);
}
