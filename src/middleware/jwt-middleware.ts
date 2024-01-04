import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from "config";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
	const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the 'Authorization' header

	if (!token)
	{
		return res.status(401).json({ error: 'Access denied, no token provided' });
	}

	try
	{
		const decoded = jwt.verify(token, config.get('auth.jwtSecret'));
		req.user = decoded; // Add the decoded token to the request object

		next();
	}
	catch (error)
	{
		res.status(400).json({ error: 'Invalid token' });
	}
};
