import { SendEmailParams } from "@models";
import { SendEmailService } from "./send-email-service";

import sgEmail from "@sendgrid/mail";
import { Errors, ServiceContext } from "@typings";
import { EmailBaseService } from "./email-base-service";
import config from "config";

export class SendEmailServiceImpl extends EmailBaseService implements SendEmailService
{
	constructor(serviceContext: ServiceContext)
	{
		super(serviceContext);
	}

	async sendEmail(params: SendEmailParams): Promise<void>
	{
		params.validate();

		sgEmail.setApiKey(config.get("sendgrid.apiKey"));
		let recipient: string[] = [];

		switch (params.sender)
		{
			case "goldbake":
				recipient = ["knocknock.suvishakha@gmail.com", params.recipient.email];
				break;

			case "drayurveda":
				recipient = ["riteshsir.math@gmail.com", "ayurvedic.suvishakha@gmail.com", params.recipient.email];
				break;

			case "centralkolkata":
				recipient = ["info@centralkolkata.org", "cksc.suvishakha@gmail.com", params.recipient.email];
				break;
		}

		const message =
		{
			to: recipient,
			from: "suvishakha.tech@gmail.com",
			subject: params.subject,
			text: params.body,
			html: `<h1>${params.body}</h1>`
		};

		try
		{
			await sgEmail.send(message);
		}
		catch (e)
		{
			throw new Errors.ValidationError("Error encountered in sending Email.",
				[
					{
						field: "error",
						message: e.response.body.errors[0].message,
					},
				]);
		}
	}
}
