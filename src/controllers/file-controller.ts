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
		// this.router.post(`${this.basePath}/convert`, this.convert);
	}

	// private convert = async (req: Request, res: Response, next: NextFunction) =>
	// {
	// // check if the request is for the first app usage, if yes then 
	// // write code to place the files (in request - file1 and file2) in c:\images directory

	// res.status(200).send(result);
	// };
}
