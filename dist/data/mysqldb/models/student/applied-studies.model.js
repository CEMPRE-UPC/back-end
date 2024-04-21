"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("./student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class AppliedStudiesModel extends sequelize_1.Model {
}
exports.AppliedStudiesModel = AppliedStudiesModel;
AppliedStudiesModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    level: {
        type: sequelize_1.DataTypes.ENUM('Nivel secundario', 'Otros estudios'),
    },
    institution: {
        type: sequelize_1.DataTypes.STRING,
    },
    collegeDegree: {
        type: sequelize_1.DataTypes.STRING,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'applied_studies',
    timestamps: false
});
student_model_1.StudentModel.hasOne(AppliedStudiesModel, { foreignKey: { name: 'studentId' } });
AppliedStudiesModel.belongsTo(student_model_1.StudentModel, { foreignKey: { name: 'studentId' } });
