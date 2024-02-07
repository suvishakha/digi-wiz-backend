import jwt from 'jsonwebtoken';
import { executeQuery } from "@database";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";
import { jwtMiddleware } from "@middleware";
import config from "config";

export class UserController extends BaseController
{
	public basePath: string = "/user";
	public publicRouter: Router = Router();
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		// Public route
		this.publicRouter.post(`${this.basePath}/createOrUpdateUser`, this.createOrUpdateUser);

		// Private route
		this.router.use(jwtMiddleware);
		this.router.get(`${this.basePath}/fetchUsers`, this.fetchUsers);
	}

	private fetchUsers = async (req: Request, res: Response, next: NextFunction) =>
	{
		const result = await executeQuery("SELECT * FROM users", []);
		res.status(200).send(result);
	};

	private createOrUpdateUser = async (req: Request, res: Response, next: NextFunction) =>
	{
		const androidId = req.body.androidId;

		if (!androidId)
		{
			return res.status(400).json({ error: 'Android ID is required' });
		}

		try
		{
			// Check if a user with this androidId already exists
			let users = await executeQuery("SELECT * FROM users WHERE device_id = ?", [androidId]);
			let userId;

			if (users.length === 0)
			{
				// Create a new user if it doesn't exist
				const result = await executeQuery("INSERT INTO users (device_id, status) VALUES (?, 'temp')", [androidId]);
				userId = result.insertId;
			}
			else
			{
				// Use the existing user's ID
				userId = users[0].id;
			}

			// Generate a JWT token
			const token = jwt.sign({ userId: userId, androidId: androidId }, config.get('auth.jwtSecret'), { expiresIn: '1h' });

			// Send the token in response
			res.status(200).json({ token });
		}
		catch (error)
		{
			console.error('Error in createOrUpdateUser:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	};
}
