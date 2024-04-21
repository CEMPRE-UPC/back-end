"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("./student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class LanguageModel extends sequelize_1.Model {
}
exports.LanguageModel = LanguageModel;
const LEVEL_LANGUAGE = ['Excelente', 'Bueno', 'Regular', 'Ninguno'];
LanguageModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    readingLevel: {
        type: sequelize_1.DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
    },
    listeningLevel: {
        type: sequelize_1.DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
    },
    speakingLevel: {
        type: sequelize_1.DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
    },
    writingLevel: {
        type: sequelize_1.DataTypes.ENUM({ values: LEVEL_LANGUAGE }),
    },
}, {
    sequelize,
    tableName: 'languages',
    timestamps: false
});
student_model_1.StudentModel.hasOne(LanguageModel, { foreignKey: { name: 'studentId' } });
LanguageModel.belongsTo(student_model_1.StudentModel, { foreignKey: { name: 'studentId' } });
