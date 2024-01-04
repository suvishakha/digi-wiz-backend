import bodyParser from "body-parser";
import { AppContext } from "@typings";
import config from "config";
import express, { Application } from "express";
import expressWinston from "express-winston";
import i18n from 'i18n';
import path from "path";
import { Server } from "http";
import winston from "winston";

import { AliveController, BaseController, EmailController, UserController } from "@controllers";
import { ErrorHandler } from "@middleware";

export class App
{
	public expressApp: Application;
	private context: AppContext;

	constructor(context: AppContext)
	{
		this.expressApp = express();
		this.context = context;
	}

	public listen(): Server
	{
		const winstonLogger: winston.Logger = this.context.logger as winston.Logger;
		this.expressApp.use(expressWinston.logger(
			{
				winstonInstance: winstonLogger
			}));

		this.initializeMiddlewares();
		this.initializeControllers();
		this.initializeErrorHandling();

		const PORT = config.get("www.port");
		return this.expressApp.listen(PORT);
	}

	public initializeMiddlewares()
	{
		i18n.configure(
			{
				autoReload: true,
				directory: path.join(__dirname, "../locales"),
				objectNotation: true,
				locales: ["hi"]
			});

		this.expressApp.use(i18n.init);

		this.expressApp.use((req, res, next) =>
		{
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Methods", "*");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept-Language");

			next();
		});

		this.expressApp.use(bodyParser.json());
	}

	public initializeErrorHandling()
	{
		this.expressApp.use(ErrorHandler.notFoundHandler);
		this.expressApp.use(ErrorHandler.serverErrorHandler);
	}

	public initializeControllers()
	{
		const controllers: BaseController[] =
			[
				new AliveController(this.context),
				new EmailController(this.context),
				new UserController(this.context)
			];

		for (const ctrl of controllers)
		{
			if (ctrl instanceof UserController)
			{
				this.expressApp.use("/", ctrl.publicRouter);
			}

			this.expressApp.use("/", ctrl.router);
		}
	}
}
