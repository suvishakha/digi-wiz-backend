import { Request } from 'express';

declare module 'express'
{
	export interface Request
	{
		user?: any; // Define 'user' as an optional property of type 'any'
	}
}
