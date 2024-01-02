import _ from 'lodash';
import {LooseObject} from "@typings";

export class Recipient
{
	email: string;
	name: string;

	constructor(email: string, name: string)
	{
		this.email = email;
		this.name = name;
	}

	public serialize(): LooseObject
	{
		return
		{
			email: this.email;
			name: this.name;
		};
	}

	public isValid(): boolean
	{
		if (_.isEmpty(_.trim(this.email)))
		{
			return false;
		}

		return true;
	}
}