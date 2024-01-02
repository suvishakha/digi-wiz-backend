import {Errors, ValidationFailure} from "@typings";
import _ from "lodash";
import {Recipient} from "./recipient";

export class SendEmailParams
{
	sender: string;
	recipient: Recipient;
	subject: string;
	body: string;

	constructor(json: any)
	{
		this.sender = _.get(json, "sender");
		this.recipient = new Recipient
			(
				_.get(json, "recipient.email"),
				_.get(json, "recipient.name")
			);
		this.subject = _.get(json, "subject");
		this.body = _.get(json, "body");
	}

	validate()
	{
		let senderValid: boolean = true;
		let recipientValid: boolean = true;
		let subjectValid: boolean = true;
		let bodyValid: boolean = true;

		let validationFailures: ValidationFailure[] = [];

		if (_.isEmpty(_.trim(this.sender)))
		{
			senderValid = false;

			validationFailures.push(
				{
					field: "sender",
					message: "Sender is invalid"
				});
		}

		if (!this.recipient.isValid())
		{
			recipientValid = false;

			validationFailures.push(
				{
					field: "recipient",
					message: "Recipient is invalid"
				});
		}

		if (_.isEmpty(_.trim(this.subject)))
		{
			subjectValid = false;

			validationFailures.push(
				{
					field: "subject",
					message: "Subject is invalid"
				});
		}

		if (_.isEmpty(_.trim(this.body)))
		{
			bodyValid = false;

			validationFailures.push(
				{
					field: "body",
					message: "Body is invalid"
				});
		}

		if (senderValid && recipientValid && subjectValid && bodyValid)
		{
		}
		else
		{
			throw new Errors.ValidationError
				(
					"VALIDATION_ERRORS.INVALID_PHONE", validationFailures,
				);
		}
	}
}