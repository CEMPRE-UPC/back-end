"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_1 = require("../student");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
const EVENTS = [
    'Enviado para revisar por CEMPRE',
    'Revisado por CEMPRE',
    'Revisado por el comité de practica del programa',
    'Revisado por el comité de practicas de la facultad',
    'Practicas avaladas',
    'Practicas rechazadas'
];
const STATUS_CEMPRE = [
    'Sin revisar',
    'Por corregir',
    'Actualizado',
    'Correcto'
];
const STATUS_PROGRAM_FACULTY = [
    ...STATUS_CEMPRE,
    'Rechazado',
    'Avalado'
];
class PracticeApplicationModel extends sequelize_1.Model {
}
exports.PracticeApplicationModel = PracticeApplicationModel;
PracticeApplicationModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    identificationFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    photoFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    classScheduleFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    epsFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    graduationCertificateFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    companyRequestLetterFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    event: {
        type: sequelize_1.DataTypes.ENUM(...EVENTS),
        defaultValue: EVENTS.at(0)
    },
    statusCempre: {
        type: sequelize_1.DataTypes.ENUM(...STATUS_CEMPRE),
        defaultValue: STATUS_CEMPRE.at(0)
    },
    statusProgram: {
        type: sequelize_1.DataTypes.ENUM(...STATUS_PROGRAM_FACULTY),
        defaultValue: STATUS_PROGRAM_FACULTY.at(0)
    },
    statusFaculty: {
        type: sequelize_1.DataTypes.ENUM(...STATUS_PROGRAM_FACULTY),
        defaultValue: STATUS_PROGRAM_FACULTY.at(0)
    },
    observation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    sequelize,
    tableName: 'practice_applications',
    timestamps: true
});
student_1.StudentModel.hasOne(PracticeApplicationModel, { foreignKey: { name: 'studentId' } });
PracticeApplicationModel.belongsTo(student_1.StudentModel, { foreignKey: { name: 'studentId' } });
