import { executeQuery } from "@database";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";
import { OAuth2Client } from 'google-auth-library';

export class AuthController extends BaseController
{
	public basePath: string = "/auth";
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		this.router.post(`${this.basePath}/handleGoogleLogin`, this.handleGoogleLogin);
	}

	private handleGoogleLogin = async (req: Request, res: Response, next: NextFunction) =>
	{
		// const { token } = req.body;

		// try
		// {
		// 	const ticket = await client.verifyIdToken({
		// 		idToken: token,
		// 		audience: CLIENT_ID,
		// 	});

		// 	const payload = ticket.getPayload();
		// 	const userid = payload['sub'];
		// 	// If request specified a G Suite domain:
		// 	// const domain = payload['hd'];

		// 	// Update or create user in your database
		// 	// ...

		// 	// Generate and send JWT
		// 	const jwtToken = jwt.sign({ userId: userid }, config.get('auth.jwtSecret'), { expiresIn: '1h' });
		// 	res.status(200).json({ token: jwtToken });
		// } catch (error)
		// {
		// 	res.status(401).json({ error: 'Invalid Google token' });
		// }

	};
}
