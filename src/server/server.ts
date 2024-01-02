require("module-alias/register");

import {AppContext} from "@typings";
import {App} from "./app";

import
{
	environment,
	logger,
	mongoStore,
	sendEmailService
} from "./dependencies";

const appContext: AppContext =
{
	environment,
	logger,
	sendEmailService
};

(async () =>
{
	try
	{
		logger.info("[WWW] Initializing connection to Mongo Store");
		await mongoStore.connect();
		logger.info("[WWW] Server Running");
		new App(appContext).listen();
	}
	catch (e)
	{
		logger.error(e);
		logger.info("[WWW] Server Errored");
		console.log(e);
	}
})();