import { executeQuery } from "@database";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";

export class UserController extends BaseController
{
	public basePath: string = "/user";
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		this.router.get(`${this.basePath}/fetchUsers`, this.fetchUsers);
	}

	private fetchUsers = async (req: Request, res: Response, next: NextFunction) =>
	{
		const result = await executeQuery("SELECT * FROM users", []);
		res.status(200).send(result);
	};
}
