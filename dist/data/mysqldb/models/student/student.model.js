"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const user_model_1 = require("../auth/user.model");
const practice_model_1 = require("./practice.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class StudentModel extends sequelize_1.Model {
}
exports.StudentModel = StudentModel;
StudentModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cedula: { type: sequelize_1.DataTypes.STRING, unique: true },
    firstName: { type: sequelize_1.DataTypes.STRING },
    secondName: { type: sequelize_1.DataTypes.STRING },
    lastName: { type: sequelize_1.DataTypes.STRING },
    middleName: { type: sequelize_1.DataTypes.STRING },
    birthDate: { type: sequelize_1.DataTypes.DATE },
    placeOfBirth: { type: sequelize_1.DataTypes.STRING },
    martialStatus: { type: sequelize_1.DataTypes.STRING },
    address: { type: sequelize_1.DataTypes.STRING },
    phone: { type: sequelize_1.DataTypes.STRING },
    eps: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    city: { type: sequelize_1.DataTypes.STRING },
}, { sequelize, timestamps: false, tableName: 'students' });
user_model_1.UserModel.hasOne(StudentModel, { as: 'user', foreignKey: { name: 'userId' } });
practice_model_1.PracticeModel.hasOne(StudentModel, { as: 'practice', foreignKey: { name: 'practiceId' } });
StudentModel.belongsTo(user_model_1.UserModel, { foreignKey: { name: 'userId' } });
StudentModel.belongsTo(practice_model_1.PracticeModel, { foreignKey: { name: 'practiceId' } });
