import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),

  MYSQL_URL: get('MYSQL_URL').required().asString(),
  MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),

  EMAIL_USER: get('EMAIL_USER').required().asString(),
  EMAIL_PASSWORD: get('EMAIL_PASSWORD').required().asString(),
}