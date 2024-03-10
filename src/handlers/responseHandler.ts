import { Request, Response } from 'express';

const responseHandler = (req: Request, res: Response): Response => {
  const { status, message } = res.locals;

  if (!message) {
    return res.status(404).json({
      message: 'Route not found',
    });
  }

  return res.status(status ?? 200).json({
    data: res.locals.message,
  });
};

export default responseHandler;
