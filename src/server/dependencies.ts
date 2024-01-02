require("module-alias/register");

import config from "config";
import i18n from "i18n";

import {Mongoose} from "@storage";
import winston from "winston";
import {SendEmailServiceImpl} from "@services";
import {ServiceContext} from '@typings';

const defaultLogLevel: string = "info";
const environment: string = process.env.NODE_CONFIG || process.env.NODE_ENV || "development";

const logger = winston.createLogger(
	{
		level: defaultLogLevel
	});

if (environment === "development")
{
	logger.add(
		new winston.transports.Console(
			{
				format: winston.format.simple(),
			}),
	);
}

const mongoStore = new Mongoose.MongoStore();

// const repositoryContext =
// {
// 	logger,
// 	store: mongoStore,
// 	translate: i18n.__
// };

const serviceContext: ServiceContext =
{
	logger
}

const sendEmailService = new SendEmailServiceImpl(serviceContext);

export
{
	environment,
	mongoStore,
	logger,
	sendEmailService
};