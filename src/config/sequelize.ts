import { Sequelize } from 'sequelize';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const DB_NAME = requireEnv('DB_NAME');
const DB_USER = requireEnv('DB_USER');
const DB_PASS = requireEnv('DB_PASS');
const DB_HOST = requireEnv('DB_HOST');

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});
