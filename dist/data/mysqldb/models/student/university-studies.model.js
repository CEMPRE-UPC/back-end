"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("./student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class UniversityStudiesModel extends sequelize_1.Model {
}
exports.UniversityStudiesModel = UniversityStudiesModel;
UniversityStudiesModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    institution: {
        type: sequelize_1.DataTypes.STRING,
    },
    program: {
        type: sequelize_1.DataTypes.STRING,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: 'university_studies',
    timestamps: false
});
student_model_1.StudentModel.hasOne(UniversityStudiesModel, { foreignKey: { name: 'studentId' } });
UniversityStudiesModel.belongsTo(student_model_1.StudentModel, { foreignKey: { name: 'studentId' } });
