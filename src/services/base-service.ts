import {Logger, ServiceContext} from "@typings";

export class BaseService
{
	protected serviceContext: ServiceContext;

	constructor(serviceContext: ServiceContext)
	{
		this.serviceContext = serviceContext;
	}

	protected getLogger(): Logger
	{
		return this.serviceContext.logger;
	}
}