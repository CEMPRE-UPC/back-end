"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const student_model_1 = require("./student.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class AreaInterestModel extends sequelize_1.Model {
}
exports.AreaInterestModel = AreaInterestModel;
AreaInterestModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        get: function () {
            return this.getDataValue('description').split(',');
        },
        set: function (val) {
            this.setDataValue('description', val.join(','));
        }
    }
}, {
    sequelize,
    tableName: 'area_interests',
    timestamps: false
});
student_model_1.StudentModel.hasOne(AreaInterestModel, { foreignKey: { name: 'studentId' } });
AreaInterestModel.belongsTo(student_model_1.StudentModel, { foreignKey: { name: 'studentId' } });
