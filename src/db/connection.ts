import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.model";

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "cempre",
    password: "123456",
    database: "cempredb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export default db;