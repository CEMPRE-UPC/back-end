"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("./student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class WorkExperienceModel extends sequelize_1.Model {
}
exports.WorkExperienceModel = WorkExperienceModel;
WorkExperienceModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    company: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    functions: {
        type: sequelize_1.DataTypes.STRING,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'worker_experiences',
    timestamps: false
});
student_model_1.StudentModel.hasMany(WorkExperienceModel, { foreignKey: { name: 'studentId' } });
WorkExperienceModel.belongsTo(student_model_1.StudentModel, { foreignKey: { name: 'studentId' } });
