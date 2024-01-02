require("module-alias/register");

import config from "config";
import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import winston from "winston";
import { SendEmailServiceImpl } from "@services";
import { ServiceContext } from '@typings';

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

const dbConfig: PoolOptions =
{
	host: 'localhost',
	user: config.get('db.username'),
	password: config.get('db.password'),
	database: config.get('db.name'),
	port: parseInt(config.get('db.port'), 10),
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
};

const pool: Pool = mysql.createPool(dbConfig);

const serviceContext: ServiceContext =
{
	logger
};

const sendEmailService = new SendEmailServiceImpl(serviceContext);

export
{
	environment,
	pool,
	logger,
	sendEmailService
};
