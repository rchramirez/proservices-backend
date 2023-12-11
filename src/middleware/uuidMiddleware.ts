import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Middleware to assign a UUID to each request
const uuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.headers.uuid = uuidv4();
  next();
};

export default uuidMiddleware;