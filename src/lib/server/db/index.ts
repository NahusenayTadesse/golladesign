import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Small pool: shared hosting limits concurrent MySQL connections per account.
const pool = mysql.createPool({
	uri: env.DATABASE_URL,
	connectionLimit: 5,
	waitForConnections: true,
	enableKeepAlive: true,
	// Store and read DATETIME values as UTC regardless of the server's timezone.
	timezone: 'Z'
});

export const db = drizzle(pool, { schema, mode: 'default' });
