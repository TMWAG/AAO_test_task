import { Pool } from 'pg';

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_DB,
	POSTGRES_PASSWORD,
} = process.env;

export const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
})