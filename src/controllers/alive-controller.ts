import {NextFunction, Request, Response, Router} from 'express';

import {AppContext} from "@typings";
import {BaseController} from "./base-controller";

export class AliveController extends BaseController
{
	public basePath: string = "/alive";
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		this.router.get(this.basePath, this.checkAliveStatus);
	}

	private checkAliveStatus =
		(
			req: Request,
			res: Response,
			next: NextFunction
		) =>
		{
			if (req.query.simulate_ee)
			{
				this.getLogger().error('This is a sample error');
				this.getLogger().info(req.params.xy.toString()); // this will cause unhandled exception
			}

			res.json(
				{
					message: res.__("MESSAGES.CHECK_ALIVE")
				});
		}
}