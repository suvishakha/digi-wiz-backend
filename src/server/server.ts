require("module-alias/register");

import { AppContext } from "@typings";
import { App } from "./app";

import
{
	environment,
	logger,
	pool,
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
		logger.info("[WWW] Initializing connection to MySql");
		new App(appContext).listen();
		logger.info("[WWW] Server Running");
	}
	catch (e)
	{
		logger.error(e);
		logger.info("[WWW] Server Errored");
		console.log(e);
	}
})();
