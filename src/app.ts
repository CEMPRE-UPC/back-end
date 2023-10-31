import { Server, AppRoutes } from './presentation';
import { envs } from './config';
import { MysqlDatabase } from './data/mysqldb';



async function main() {

    // await MongoDatabase.connect({
    //     mongoUrl: envs.MONGO_URL,
    //     database: envs.MONGO_DB_NAME
    // })

    await MysqlDatabase.connect({
        mysqlUrl: envs.MYSQL_URL,
        database: envs.MYSQL_DB_NAME
    })


    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}
main();

