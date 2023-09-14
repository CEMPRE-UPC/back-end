import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import { Role } from '../models/role.model';

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "cempre",
    password: "123456",
    database: "cempredb",
    synchronize: true,
    logging: false,
    entities: [User, Role],
    migrations: [],
    subscribers: [],
})

export default db;