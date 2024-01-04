import { SendEmailParams } from "@models";
import { AppContext } from "@typings";
import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";
import { jwtMiddleware } from "@middleware";

export class EmailController extends BaseController
{
	public basePath: string = "/email";
	public router: Router = Router();

	constructor(context: AppContext)
	{
		super(context);
		this.initializeRoutes();
	}

	private initializeRoutes()
	{
		this.router.post(`${this.basePath}/sendEmail`, jwtMiddleware, this.sendEmail);
	}

	private sendEmail = async (req: Request, res: Response, next: NextFunction) =>
	{
		const { sender, recipient, subject, body } = req.body;

		const sendEmailParams: SendEmailParams = new SendEmailParams
			({
				sender, recipient, subject, body
			});

		try
		{
			await this.appContext.sendEmailService.sendEmail(sendEmailParams);
			res.send({ message: "Mail sent successfully!" });
		}
		catch (e)
		{
			next(e);
		}
	};
}
