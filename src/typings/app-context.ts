import {SendEmailService} from "@services";
import {Logger} from "@typings";

export type AppContext =
	{
		environment: string;
		logger: Logger;

		sendEmailService: SendEmailService;
	};