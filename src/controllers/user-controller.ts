import { executeQuery } from "@database";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";
import { jwtMiddleware } from "@middleware";

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
		this.publicRouter.get(`${this.basePath}/createOrUpdateUser`, this.createOrUpdateUser);

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
		const result = await executeQuery("SELECT * FROM users where id = 3", []);
		res.status(200).send(result);
	};
}
