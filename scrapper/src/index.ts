import { ICDResponse } from "./@types";
import "dotenv/config";
import { Client } from "./utils/db_connection";

async function getBitcoinData() {
	try {
		await Client.query(`
			CREATE TABLE IF NOT EXISTS "currency" (
				"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
				"rateFloat" FLOAT NOT NULL
			);
		`);
		const data = await fetch(
			"https://api.coindesk.com/v1/bpi/currentprice.json"
		).then<ICDResponse>((res) => res.json());
		const res = await Client.query(
			`INSERT INTO currency("rateFloat") values($1) RETURNING *`,
			[data.bpi.USD.rate_float],
		);
		console.log(res.rows);
	} catch (e) {
		console.log(e);
	}
}
setInterval(getBitcoinData, 1000 * 60);
