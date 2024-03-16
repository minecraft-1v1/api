import type { NextFunction, Request, Response } from 'express';

export default async (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (typeof error === 'string') {
    res.locals.message = error;
    res.locals.status = res.locals.status ?? 400;

    return next();
  }

  if (process.env.NODE_ENV === 'development') {
    res.locals.message = error instanceof Error ? error.message : error;
    res.locals.status = res.locals.status ?? 400;
  } else {
    res.locals.message = 'Internal server error';
    res.locals.status = 500;
  }

  return next();
};
