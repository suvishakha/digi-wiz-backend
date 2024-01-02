import { pool } from "@server";

async function executeQuery(sql: string, params: any[]): Promise<any>
{
	try
	{
		const [rows] = await pool.query(sql, params);
		return rows;
	}
	catch (err)
	{
		console.error('Error executing query:', err);
		throw err;
	}
}

export { executeQuery };
