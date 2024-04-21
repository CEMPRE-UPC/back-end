"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachedFileModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("../student/student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class AttachedFileModel extends sequelize_1.Model {
}
exports.AttachedFileModel = AttachedFileModel;
AttachedFileModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: (0, sequelize_1.ENUM)('Identificacion', 'Foto', 'Horario de clases', 'EPS', 'Certificado de egresado', 'Carta solicitud empresa'),
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: 'attached_files',
    timestamps: false
});
student_model_1.StudentModel.hasOne(AttachedFileModel, { as: 'student', foreignKey: { name: 'studentId' } });
AttachedFileModel.belongsTo(student_model_1.StudentModel, { as: 'student', foreignKey: { name: 'studentId' } });
