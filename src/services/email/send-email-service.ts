import {SendEmailParams} from "@models";

export interface SendEmailService
{
	sendEmail(params: SendEmailParams): Promise<void>;
}