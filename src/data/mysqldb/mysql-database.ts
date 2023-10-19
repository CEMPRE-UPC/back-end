import { Sequelize } from 'sequelize';

export interface Options {
    mysqlUrl: string;
    database: string;
}

export class MysqlDatabase {
    private static instance: Sequelize | null = null;

    static initialize({ mysqlUrl, database }:Options): Sequelize {
        if (!MysqlDatabase.instance) {
            MysqlDatabase.instance = new Sequelize(mysqlUrl, {
                database,
                dialect: 'mysql',
                port: 3306,
                // logging: false
            });
        }
        return MysqlDatabase.instance;
    }

    static async connect(options: Options) {

        try {
            const sequelize = this.initialize(options);
            await sequelize.sync()
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }

    }
}