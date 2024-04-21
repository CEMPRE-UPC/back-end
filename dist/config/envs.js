"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    MYSQL_URL: (0, env_var_1.get)('MYSQL_URL').required().asString(),
    MYSQL_DB_NAME: (0, env_var_1.get)('MYSQL_DB_NAME').required().asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
    EMAIL_USER: (0, env_var_1.get)('EMAIL_USER').required().asString(),
    EMAIL_PASSWORD: (0, env_var_1.get)('EMAIL_PASSWORD').required().asString(),
};
