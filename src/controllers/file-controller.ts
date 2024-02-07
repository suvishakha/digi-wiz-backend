import { executeQuery } from "@database";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";

export class FileController extends BaseController
{
	public basePath: string = "/file";
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		this.router.post(`${this.basePath}/convert`, this.convert);
	}

	private convert = async (req: Request, res: Response, next: NextFunction) =>
	{
		// The userid and androidid will be extracted from JWT
		// This will have 2 incomgin files - source, destincation
		// this will also have a parameter called as params
		// params will have - size: int, quality: int
		// the table: user_limits will be queried by userid: select done_count, available_count from user_limits where user_id = userId
		// if the avaialble_coung > 0, then rename the source to androidId_<done_count+1>_S, rename the destination to androidId_<done_count+1>_D
		// now place these two files in c:\images folder
	};
}
