import { Sequelize } from 'sequelize';


const db = new Sequelize('cempredb', 'cempre','123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // logging: false
});

export default db;